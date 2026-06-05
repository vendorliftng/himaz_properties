'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'himaz2024'

    if (password === adminPassword) {
      sessionStorage.setItem('himaz_admin', 'true')
      router.push('/admin')
    } else {
      setError('Invalid password')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-himaz-cream flex items-center justify-center">
      <div className="absolute inset-0 hero-pattern opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-himaz-brown rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-himaz-gold" />
          </div>
          <h1 className="font-display text-2xl font-bold text-himaz-brown">
            Admin Portal
          </h1>
          <p className="text-sm text-himaz-brown-light mt-1">
            Himaz Properties Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-himaz-brown mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-himaz-brown/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-himaz-brown"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-himaz-brown-light hover:text-himaz-brown"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-himaz-brown text-himaz-gold rounded-xl font-semibold hover:bg-himaz-brown-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <a
          href="/"
          className="block text-center text-sm text-himaz-brown-light hover:text-himaz-brown mt-6 transition-colors"
        >
          Back to Website
        </a>
      </motion.div>
    </main>
  )
}
