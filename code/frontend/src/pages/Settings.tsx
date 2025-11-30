import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

const phoneRegex = /^\+?[0-9\s\-()]+$/

const phoneNumberSchema = z
  .string()
  .trim()
  .refine((value) => value.length === 0 || value.length >= 7, {
    message: 'Phone number must be at least 7 characters',
  })
  .refine((value) => value.length === 0 || value.length <= 20, {
    message: 'Phone number must be 20 characters or less',
  })
  .refine((value) => value.length === 0 || phoneRegex.test(value), {
    message: 'Phone number can include numbers, spaces, +, -, and parentheses',
  })

const profileSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phoneNumber: phoneNumberSchema.optional(),
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
      message: 'Add your phone number to enable WhatsApp alerts',
      path: ['assignmentWhatsappOptIn'],
    },
  )

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

const helpContent = {
  gettingStarted: {
    title: 'Getting Started',
    content: [
      'Welcome to Metralis CMMS! This system helps you manage your factory maintenance operations.',
      'Start by exploring the Dashboard to see an overview of your machines and work orders.',
      'Navigate using the sidebar menu to access different sections of the application.',
    ],
  },
  features: [
    {
      title: 'Work Orders',
      description: 'Create and manage work orders to track maintenance tasks. Assign them to technicians and track their status.',
    },
    {
      title: 'Machines',
      description: 'Register and manage your factory machines. View their history and link documents.',
    },
    {
      title: 'Repairs',
      description: 'Log repair actions and document what was done to fix issues. Link parts used and record root causes.',
    },
    {
      title: 'Search',
      description: 'Use the global search to quickly find machines, work orders, or parts.',
    },
    {
      title: 'Documents',
      description: 'Upload and manage machine manuals, SOPs, and other documentation.',
    },
  ],
  faq: [
    {
      question: 'What are work order statuses?',
      answer: 'Work orders can be: Open (newly created), In Progress (being worked on), Waiting (on hold), or Closed (completed).',
    },
    {
      question: 'What user roles are available?',
      answer: 'There are three roles: Admin (full access), Manager (can assign work orders), and Technician (can create and work on orders).',
    },
    {
      question: 'How do I change my password?',
      answer: 'Go to Settings and use the Change Password section. You\'ll need to enter your current password.',
    },
    {
      question: 'Can I upload documents?',
      answer: 'Yes! Admins can upload PDFs and other documents in the Documents section and link them to machines.',
    },
  ],
}

export default function Settings() {
  const { user, refreshUser } = useAuth()
  const { i18n } = useTranslation()
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false)
  const [isPreferencesExpanded, setIsPreferencesExpanded] = useState(false)
  const [isHelpExpanded, setIsHelpExpanded] = useState(false)
  const [language, setLanguage] = useState<string>('en')

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
        const { data } = await api.get('/users/me/preferences')
        const prefs = data.data || {}
        if (prefs.language) {
          setLanguage(prefs.language)
          i18n.changeLanguage(prefs.language)
          document.documentElement.dir = prefs.language === 'ar' ? 'rtl' : 'ltr'
        }
      } catch {
        // Fallback to localStorage or default
        const stored = localStorage.getItem('i18nextLng') || 'en'
        setLanguage(stored)
      }
    }
    loadPreferences()
  }, [i18n])

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
      await api.patch('/users/me', {
        name: data.name,
        email: data.email,
        phoneNumber: sanitizedPhoneNumber,
        assignmentWhatsappOptIn: data.assignmentWhatsappOptIn ?? false,
      })
      await refreshUser()
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    } catch (error: unknown) {
      setProfileError(getApiError(error) || 'Failed to update profile')
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsChangingPassword(true)
    setPasswordError(null)
    setPasswordSuccess(false)

    try {
      await api.patch('/users/me/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      setPasswordSuccess(true)
      passwordForm.reset()
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (error: unknown) {
      setPasswordError(getApiError(error) || 'Failed to change password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('i18nextLng', newLanguage)

    try {
      await api.patch('/users/me/preferences', { language: newLanguage })
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
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 555 123 4567"
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
                      WhatsApp work order alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Provide a phone number above to receive a WhatsApp message whenever you get assigned to a work order.
                    </p>
                  </div>
                  <input
                    id="assignmentWhatsappOptIn"
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer rounded border border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={!hasPhoneForWhatsapp}
                    {...profileForm.register('assignmentWhatsappOptIn')}
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
              <Label>Role</Label>
              <div>
                <Badge variant={getRoleBadgeVariant(user?.role || '')}>
                  {user?.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your role cannot be changed. Contact an administrator if you need a role change.
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
                Profile updated successfully
              </div>
            )}

            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
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
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
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
                <Label htmlFor="currentPassword">Current Password</Label>
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
                <Label htmlFor="newPassword">New Password</Label>
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
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
                  Password changed successfully
                </div>
              )}

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
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
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your application preferences such as language and appearance. 
            </CardDescription>
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
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
              <p className="text-sm text-muted-foreground">
                Choose your preferred language for the interface
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
              Help & Documentation
            </CardTitle>
            <CardDescription>
              Learn how to use the system and find answers to common questions
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
              <h3 className="font-semibold mb-3">Feature Guides</h3>
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
                Frequently Asked Questions
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
                About
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Metralis CMMS v1.0</p>
                <p>Factory Intelligence Layer - Foundation Release</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

