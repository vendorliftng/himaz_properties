'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Shield, TrendingUp, MapPin } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/data'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-himaz-cream hero-pattern">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-himaz-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-himaz-brown/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-himaz-brown/10 rounded-full text-sm text-himaz-brown font-medium"
            >
              <Shield className="w-4 h-4 text-himaz-gold" />
              Verified Properties in Adamawa
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-himaz-brown leading-[1.1]"
            >
              Build Your
              <span className="block text-gradient-gold">Legacy</span>
              in Adamawa
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-himaz-brown-light max-w-lg leading-relaxed"
            >
              Premium land and properties in Yola, Jimeta, and beyond. 
              From Sunshine City to The Meridian Estate, find verified plots 
              and homes with flexible payment plans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#properties"
                className="px-8 py-4 bg-himaz-brown text-himaz-gold rounded-full font-semibold hover:bg-himaz-brown-light transition-all hover:scale-105"
              >
                Explore Properties
              </a>
              <a
                href={getWhatsAppLink('Hello Himaz Properties! I would like to schedule a site inspection.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-himaz-brown text-himaz-brown rounded-full font-semibold hover:bg-himaz-brown hover:text-himaz-gold transition-all"
              >
                Book Inspection
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-himaz-brown-light">
                <TrendingUp className="w-4 h-4 text-himaz-gold" />
                <span>15-25% Annual Appreciation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-himaz-brown-light">
                <MapPin className="w-4 h-4 text-himaz-gold" />
                <span>5 Prime Locations</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="glass rounded-3xl p-6 shadow-2xl border border-white/50">
                <div className="aspect-[4/3] bg-gradient-to-br from-himaz-brown to-himaz-brown-light rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80')] bg-cover bg-center opacity-60" />
                  <div className="relative z-10 text-center text-white">
                    <h3 className="font-display text-3xl font-bold">Sunshine City</h3>
                    <p className="text-white/80 mt-1">Beside Fintiri Estate</p>
                    <div className="mt-4 inline-block px-4 py-2 bg-himaz-gold/90 rounded-full text-himaz-brown font-bold">
                      ₦1.25M — ₦2.5M
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-himaz-gold/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-himaz-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-himaz-brown">Verified Listing</p>
                    <p className="text-xs text-himaz-brown-light">Title & Survey Ready</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-himaz-brown">500+</p>
                  <p className="text-xs text-himaz-brown-light">Happy Clients</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-himaz-brown-light"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}