'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, User, Mail, MessageSquare, CheckCircle, Home, MapPin } from 'lucide-react'
import { properties, getWhatsAppLink } from '@/lib/data'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '',
    budget: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact_form',
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', phone: '', email: '', interest: '', budget: '', message: '' })
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Failed to submit. Please try again or use WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section id="contact" className="py-24 bg-himaz-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 text-center shadow-xl"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-himaz-brown mb-3">
              Enquiry Received!
            </h3>
            <p className="text-himaz-brown-light mb-8 max-w-md mx-auto">
              Thank you for reaching out. Our team will contact you within 24 hours. 
              For faster response, message us directly on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={getWhatsAppLink('Hello Himaz Properties! I just submitted an enquiry on your website. I would like to discuss further.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
              >
                Continue on WhatsApp
              </a>
              <button
                onClick={() => setSuccess(false)}
                className="px-8 py-3 border border-himaz-brown/20 text-himaz-brown rounded-full font-medium hover:bg-himaz-brown/5 transition-colors"
              >
                Send Another Enquiry
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-himaz-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-himaz-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-himaz-brown/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-himaz-brown mb-4">
            Book a <span className="text-gradient-gold">Site Inspection</span>
          </h2>
          <p className="text-himaz-brown-light text-lg max-w-xl mx-auto">
            Fill in your details and we will schedule a physical site visit to any of our estates. 
            Or chat with us directly on WhatsApp for instant response.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 sm:p-10 shadow-lg space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-himaz-brown mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himaz-brown-light" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-himaz-brown mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himaz-brown-light" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +2348012345678"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-himaz-brown mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himaz-brown-light" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com (optional)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-himaz-brown mb-1.5">
                    Interested Property
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himaz-brown-light" />
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown appearance-none"
                    >
                      <option value="">Select an estate</option>
                      {properties.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-himaz-brown mb-1.5">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown appearance-none"
                  >
                    <option value="">Select budget</option>
                    <option value="Under ₦500K">Under ₦500K</option>
                    <option value="₦500K - ₦1.5M">₦500K - ₦1.5M</option>
                    <option value="₦1.5M - ₦3M">₦1.5M - ₦3M</option>
                    <option value="₦3M - ₦5M">₦3M - ₦5M</option>
                    <option value="Above ₦5M">Above ₦5M</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-himaz-brown mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-himaz-brown-light" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more about what you are looking for..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-himaz-brown text-himaz-gold rounded-full font-semibold hover:bg-himaz-brown-light transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Submit Enquiry'}
                </button>
                <a
                  href={getWhatsAppLink('Hello Himaz Properties! I would like to book a site inspection.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp Instead
                </a>
              </div>
            </form>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-3xl p-8 shadow-lg">
              <h3 className="font-display text-xl font-bold text-himaz-brown mb-6">
                Why Site Inspection?
              </h3>
              <ul className="space-y-4">
                {[
                  'Verify the physical location and boundaries',
                  'See existing infrastructure and roads',
                  'Meet our team and ask questions in person',
                  'Review documentation on-site',
                  'No obligation — free guided tour',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-himaz-brown-light">
                    <CheckCircle className="w-4 h-4 text-himaz-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-8 shadow-lg bg-himaz-brown text-white">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-himaz-gold" />
                <h3 className="font-display text-lg font-bold">Visit Our Office</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Opp Urban Planning State Low-cost,<br />
                Jimeta Yola, Adamawa State
              </p>
              <p className="text-sm text-white/50">
                Mon - Sat: 9:00 AM - 5:00 PM
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
