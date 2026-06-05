'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Zap, CheckCircle, Lock, Star, Phone, User } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/data'

export default function VIPAlerts() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !name) return
    setLoading(true)

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          interest: 'VIP WhatsApp Alerts',
          source: 'vip_alert',
          message: 'Subscribed to VIP WhatsApp Alert community',
        }),
      })
    } catch {
      // Silent fail — user still sees success
    }

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-24 bg-himaz-brown relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-himaz-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-himaz-gold/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-himaz-gold/20 rounded-full text-sm text-himaz-gold font-medium mb-4">
            <Zap className="w-4 h-4" />
            Exclusive Access
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            VIP WhatsApp <span className="text-himaz-gold">Alert Engine</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Join our exclusive community and get new property releases, special discounts, 
            and infrastructure updates 48 hours before anyone else.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto"
        >
          {!submitted ? (
            <>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <Bell className="w-5 h-5" />, label: 'Early Access', desc: 'New listings first' },
                  { icon: <Lock className="w-5 h-5" />, label: 'Private Deals', desc: 'Member-only prices' },
                  { icon: <Star className="w-5 h-5" />, label: 'Insider News', desc: 'Infrastructure updates' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-himaz-gold mb-2 flex justify-center">{item.icon}</div>
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="WhatsApp number"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-himaz-gold text-himaz-brown rounded-xl font-semibold hover:bg-himaz-gold-light transition-colors disabled:opacity-50"
                >
                  {loading ? 'Joining...' : 'Join VIP Community — It\'s Free'}
                </button>
                <p className="text-center text-xs text-white/30">
                  No spam. Unsubscribe anytime. Your number is never shared.
                </p>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-himaz-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-himaz-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                You&apos;re In!
              </h3>
              <p className="text-white/60 mb-8 max-w-sm mx-auto">
                Welcome to the Himaz VIP community. You will now receive exclusive updates 
                directly on WhatsApp.
              </p>
              <a
                href={getWhatsAppLink(`Hello Himaz Properties! I just joined the VIP Alert community. My name is ${name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Save Our WhatsApp Number
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
