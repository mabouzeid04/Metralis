import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { TFunction } from 'i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Info,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n'

const phoneRegex = /^\+?[0-9\s\-()]+$/

const buildProfileSchema = (t: TFunction) =>
  z
    .object({
      name: z.string().min(1, { message: t('validation.nameRequired') }),
      email: z.string().email({ message: t('validation.emailValid') }),
      phoneNumber: z
        .string()
        .trim()
        .refine((value) => value.length === 0 || value.length >= 7, {
          message: t('validation.phoneMin'),
        })
        .refine((value) => value.length === 0 || value.length <= 20, {
          message: t('validation.phoneMax'),
        })
        .refine((value) => value.length === 0 || phoneRegex.test(value), {
          message: t('validation.phoneFormat'),
        })
        .optional(),
      assignmentWhatsappOptIn: z.boolean().optional(),
    })
    .refine(
      (data) => {
        const hasWhatsappPhone =
          typeof data.phoneNumber === 'string' && data.phoneNumber.length > 0
        if (data.assignmentWhatsappOptIn && !hasWhatsappPhone) {
          return false
        }
        return true
      },
      {
        message: t('validation.whatsappRequiresPhone'),
        path: ['assignmentWhatsappOptIn'],
      },
    )

const buildPasswordSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: t('validation.currentPasswordRequired') }),
      newPassword: z
        .string()
        .min(8, { message: t('validation.newPasswordLength') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validation.passwordsMatch'),
      path: ['confirmPassword'],
    })

type ProfileFormValues = z.infer<ReturnType<typeof buildProfileSchema>>
type PasswordFormValues = z.infer<ReturnType<typeof buildPasswordSchema>>

export default function Settings() {
  const { user, refreshUser } = useAuth()
  const { i18n, t } = useTranslation(['settings', 'common'])
  const profileSchema = useMemo(() => buildProfileSchema(t), [t])
  const passwordSchema = useMemo(() => buildPasswordSchema(t), [t])
  const helpContent = useMemo(
    () => ({
      gettingStarted: {
        title: t('help.gettingStartedTitle'),
        content: t('help.gettingStarted', { returnObjects: true }) as string[],
      },
      features: t('help.features', { returnObjects: true }) as {
        title: string
        description: string
      }[],
      faq: t('help.faq', { returnObjects: true }) as {
        question: string
        answer: string
      }[],
      aboutLines: t('help.aboutLines', { returnObjects: true }) as string[],
    }),
    [t],
  )
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false)
  const [isPreferencesExpanded, setIsPreferencesExpanded] = useState(false)
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)
  const [language, setLanguage] = useState<string>(i18n.language || 'en')

  const isEligibleForWhatsapp = user?.role === 'ADMIN' || user?.role === 'TECHNICIAN'

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber ?? '',
      assignmentWhatsappOptIn: user?.assignmentWhatsappOptIn ?? false,
    },
  })

  const watchedPhoneNumber = profileForm.watch('phoneNumber')
  const hasPhoneForWhatsapp =
    typeof watchedPhoneNumber === 'string'
      ? watchedPhoneNumber.trim().length > 0
      : Boolean(watchedPhoneNumber)

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  })

  const togglePasswordExpansion = () => {
    setIsPasswordExpanded((previous) => !previous)
  }

  const togglePreferencesExpansion = () => {
    setIsPreferencesExpanded((previous) => !previous)
  }

  const toggleHelpExpansion = () => {
    setIsHelpExpanded((previous) => !previous)
  }

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber ?? '',
        assignmentWhatsappOptIn: user.assignmentWhatsappOptIn ?? false,
      })
    }
  }, [user, profileForm])

  useEffect(() => {
    if (!hasPhoneForWhatsapp && profileForm.getValues('assignmentWhatsappOptIn')) {
      profileForm.setValue('assignmentWhatsappOptIn', false)
    }
  }, [hasPhoneForWhatsapp, profileForm])

  useEffect(() => {
    // Load language preference
    const loadPreferences = async () => {
      try {
        const { data } = await api.get('/profile/me/preferences')
        const prefs = data.data || {}
        if (prefs.language && SUPPORTED_LANGUAGES.some((lng) => lng.code === prefs.language)) {
          setLanguage(prefs.language)
          await i18n.changeLanguage(prefs.language)
        }
      } catch {
        // Fallback to localStorage or default
        const stored = localStorage.getItem('i18nextLng') || i18n.language || 'en'
        setLanguage(stored)
      }
    }
    void loadPreferences()
  }, [i18n])

  useEffect(() => {
    setLanguage(i18n.language || 'en')
  }, [i18n.language])

  const getApiError = (err: unknown) =>
    (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsUpdatingProfile(true)
    setProfileError(null)
    setProfileSuccess(false)

    try {
      const sanitizedPhoneNumber =
        typeof data.phoneNumber === 'string' && data.phoneNumber.length > 0
          ? data.phoneNumber
          : null
      await api.patch('/profile/me', {
        name: data.name,
        email: data.email,
        phoneNumber: sanitizedPhoneNumber,
        assignmentWhatsappOptIn: data.assignmentWhatsappOptIn ?? false,
      })
      await refreshUser()
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    } catch (error: unknown) {
      setProfileError(getApiError(error) || t('profile.error'))
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsChangingPassword(true)
    setPasswordError(null)
    setPasswordSuccess(false)

    try {
      await api.patch('/profile/me/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      setPasswordSuccess(true)
      passwordForm.reset()
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (error: unknown) {
      setPasswordError(getApiError(error) || t('password.error'))
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('i18nextLng', newLanguage)

    try {
      await api.patch('/profile/me/preferences', { language: newLanguage })
    } catch {
      // Silently fail - preference is already saved locally
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.title')}</CardTitle>
          <CardDescription>{t('profile.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('profile.fields.fullName')}</Label>
              <Input
                id="name"
                {...profileForm.register('name')}
                className="bg-muted/30"
              />
              {profileForm.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('profile.fields.email')}</Label>
              <Input
                id="email"
                type="email"
                {...profileForm.register('email')}
                className="bg-muted/30"
              />
              {profileForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t('profile.fields.phoneNumber')}</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder={t('profile.placeholders.phone')}
                {...profileForm.register('phoneNumber')}
                className="bg-muted/30"
              />
              {profileForm.formState.errors.phoneNumber && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            {isEligibleForWhatsapp && (
              <>
                <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-lg border border-border/60 p-4">
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="assignmentWhatsappOptIn" className="text-base font-medium">
                      {t('profile.whatsappLabel')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('profile.whatsappDescription')}
                    </p>
                  </div>
                  <Checkbox
                    id="assignmentWhatsappOptIn"
                    disabled={!hasPhoneForWhatsapp}
                    checked={profileForm.watch('assignmentWhatsappOptIn') || false}
                    onCheckedChange={(checked) => {
                      profileForm.setValue('assignmentWhatsappOptIn', checked as boolean)
                    }}
                  />
                </div>
                {profileForm.formState.errors.assignmentWhatsappOptIn && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.assignmentWhatsappOptIn.message}
                  </p>
                )}
              </>
            )}

            <div className="space-y-2">
              <Label>{t('profile.roleLabel')}</Label>
              <div>
                <Badge variant={getRoleBadgeVariant(user?.role || '')}>
                  {t(`common:roles.${user?.role?.toLowerCase()}`, { defaultValue: user?.role })}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('profile.roleHint')}
              </p>
            </div>

            {profileError && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {t('profile.success')}
              </div>
            )}

            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('common:actions.saveChanges')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card>
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between"
          onClick={togglePasswordExpansion}
        >
          <div className="space-y-1">
            <CardTitle>{t('password.title')}</CardTitle>
            <CardDescription>{t('password.description')}</CardDescription>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              isPasswordExpanded ? 'rotate-180' : ''
            }`}
          />
        </CardHeader>
        {isPasswordExpanded && (
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t('password.current')}</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...passwordForm.register('currentPassword')}
                  className="bg-muted/30"
                />
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('password.new')}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...passwordForm.register('newPassword')}
                  className="bg-muted/30"
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('password.confirm')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...passwordForm.register('confirmPassword')}
                  className="bg-muted/30"
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {passwordError && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {t('password.success')}
                </div>
              )}

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('password.title')}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Preferences Section */}
      <Card>
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between"
          onClick={togglePreferencesExpansion}
        >
          <div className="space-y-1">
            <CardTitle>{t('preferences.title')}</CardTitle>
            <CardDescription>{t('preferences.description')}</CardDescription>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              isPreferencesExpanded ? 'rotate-180' : ''
            }`}
          />
        </CardHeader>
        {isPreferencesExpanded && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t('preferences.languageLabel')}</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {SUPPORTED_LANGUAGES.map((lng) => (
                  <option key={lng.code} value={lng.code}>
                    {lng.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-muted-foreground">
                {t('preferences.languageHelper')}
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Help & Documentation Section */}
      <Card>
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between"
          onClick={toggleHelpExpansion}
        >
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {t('help.title')}
            </CardTitle>
            <CardDescription>
              {t('help.description')}
            </CardDescription>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              isHelpExpanded ? 'rotate-180' : ''
            }`}
          />
        </CardHeader>
        {isHelpExpanded && (
          <CardContent className="space-y-6">
            {/* Getting Started */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {helpContent.gettingStarted.title}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
                {helpContent.gettingStarted.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Feature Guides */}
            <div>
              <h3 className="font-semibold mb-3">{t('help.featuresTitle')}</h3>
              <div className="space-y-3">
                {helpContent.features.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {t('help.faqTitle')}
              </h3>
              <div className="space-y-3">
                {helpContent.faq.map((item, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-medium mb-1">{item.question}</h4>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                {t('help.aboutTitle')}
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                {helpContent.aboutLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

