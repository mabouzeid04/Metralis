import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

type LoginFormValues = z.infer<ReturnType<typeof buildLoginSchema>>

function buildLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email({ message: t('validation.email') }),
    password: z.string().min(1, { message: t('validation.passwordRequired') }),
  })
}

export default function Login() {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const { t } = useTranslation(['auth', 'common'])
  const loginSchema = useMemo(() => buildLoginSchema(t), [t])
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setFormError(null)
    try {
      await login(data)
      navigate('/')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : t('auth:login.error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 flex-col justify-between p-12 text-white">
            <div>
                <img src="/metralis-white-logo.png" alt="Metralis" className="h-24" />
            </div>
            <div className="space-y-4 max-w-lg">
                <h1 className="text-4xl font-bold leading-tight">{t('auth:login.heroTitle')}</h1>
                <p className="text-slate-400 text-lg">{t('auth:login.heroBody')}</p>
            </div>
            <div className="text-sm text-slate-500">
                {t('auth:login.footer')}
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center bg-background p-8">
            <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
                <CardHeader className="space-y-1 text-center sm:text-left">
                    <CardTitle className="text-2xl font-bold">{t('auth:login.title')}</CardTitle>
                    <CardDescription>
                        {t('auth:login.subtitle')}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('common:form.email')}</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="name@example.com" 
                                className="bg-muted/30"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">{t('common:form.password')}</Label>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm font-medium text-primary hover:text-primary/80"
                                >
                                    {t('auth:login.forgotPassword')}
                                </Link>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                className="bg-muted/30"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        {formError && (
                            <div className="w-full p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {formError}
                            </div>
                        )}
                        <Button className="w-full h-10" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('auth:login.submit')}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            {t('auth:login.noAccount')}{' '}
                            <Link to="/signup" className="font-medium text-primary hover:underline underline-offset-4">
                                {t('auth:login.signup')}
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </div>
  )
}
