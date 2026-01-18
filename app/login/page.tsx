'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, ChefHat } from 'lucide-react'
import { toast } from 'sonner'
import { login, isAuthenticated } from '@/lib/auth'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectTo = searchParams.get('next') || '/items'

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/items')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(email, password)
    
    if (success) {
      toast.success('Welcome back! Login successful.')
      router.push(redirectTo)
    } else {
      setError('Invalid email or password. Please try again.')
      toast.error('Login failed. Check your credentials.')
    }
    
    setLoading(false)
  }

  const fillDemoCredentials = () => {
    setEmail('admin@minimalbites.com')
    setPassword('123456')
    toast.info('Demo credentials filled!')
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-display font-bold text-dark mb-2">
          <ChefHat className="w-8 h-8 text-primary" />
          MinimalBites
        </Link>
        <h1 className="text-3xl font-bold text-dark mt-6 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
        <p className="text-sm font-medium text-dark mb-2">🔑 Demo Credentials:</p>
        <p className="text-sm text-gray-600">Email: admin@minimalbites.com</p>
        <p className="text-sm text-gray-600">Password: 123456</p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-3 text-sm text-primary font-semibold hover:underline"
        >
          Click to auto-fill →
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field pl-12"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field pl-12 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <LogIn className="w-5 h-5" />
              Sign In
            </span>
          )}
        </button>
      </form>

      <p className="text-center text-gray-500 mt-8">
        Don&apos;t have an account?{' '}
        <span className="text-primary font-semibold">Contact admin</span>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>

      <div className="hidden lg:flex flex-1 bg-dark items-center justify-center p-12">
        <div className="text-center text-white max-w-lg">
          <ChefHat className="w-20 h-20 text-primary mx-auto mb-8" />
          <h2 className="text-4xl font-display font-bold mb-4">
            Fresh food, minimal fuss.
          </h2>
          <p className="text-gray-400 text-lg">
            Access your dashboard to manage menu items, view orders, and keep your customers happy.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm text-gray-400">Orders</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary">100+</p>
              <p className="text-sm text-gray-400">Items</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary">4.9★</p>
              <p className="text-sm text-gray-400">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
