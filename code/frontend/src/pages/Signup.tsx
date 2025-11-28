import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function Signup() {
  const navigate = useNavigate()
  const { signup, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setFormError(null)
    setSuccessMessage(null)
    try {
      const result = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      if (result?.status === 'APPROVED') {
        navigate('/')
      } else {
        setSuccessMessage('Thanks! Your technician account request was submitted and is awaiting admin approval.')
        navigate('/awaiting-approval', { state: { email: data.email } })
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to sign up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 flex-col p-12 text-white relative">
            <div>
                <img src="/metralis-white-logo.png" alt="Metralis" className="h-24" />
            </div>
            <div className="flex-1 flex items-center">
                <div className="space-y-4 max-w-lg">
                    <h1 className="text-4xl font-bold leading-tight">Join the Future of Manufacturing.</h1>
                    <p className="text-slate-400 text-lg">Create an account to start managing your factory smarter, faster, and better.</p>
                </div>
            </div>
            <div className="text-sm text-slate-500">
                © 2025 Metralis Inc. All rights reserved.
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center bg-background p-8">
            <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
                <CardHeader className="space-y-1 text-center sm:text-left">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Technician accounts require admin approval before access is granted.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                                id="name" 
                                placeholder="John Doe" 
                                className="bg-muted/30"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
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
                            <Label htmlFor="password">Password</Label>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input 
                                id="confirmPassword" 
                                type="password" 
                                className="bg-muted/30"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        {formError && (
                            <div className="w-full p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {formError}
                            </div>
                        )}
                        {successMessage && (
                            <div className="w-full p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md border border-emerald-100">
                                {successMessage}
                            </div>
                        )}
                        <Button className="w-full h-10" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-primary hover:underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </div>
  )
}
