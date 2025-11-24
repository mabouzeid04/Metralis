import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="mb-8">
        <img src="/metralis-logo.png" alt="Metralis" className="h-20" />
      </div>
      <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Page not found</p>
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
}

