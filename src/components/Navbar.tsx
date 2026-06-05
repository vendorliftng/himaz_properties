'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWhatsAppLink } from '@/lib/data'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Properties', href: '#properties' },
  { label: 'Match Quiz', href: '#quiz' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Insights', href: '#insights' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-himaz-brown rounded-lg flex items-center justify-center">
                <span className="text-himaz-gold font-display font-bold text-lg">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-xl leading-tight text-himaz-brown">
                  Himaz
                </h1>
                <p className="text-[10px] tracking-[0.2em] uppercase text-himaz-brown-light">
                  Properties Ltd
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-himaz-brown-light hover:text-himaz-brown transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-himaz-gold transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={getWhatsAppLink('Hello Himaz Properties! I am interested in viewing available properties.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-himaz-brown text-himaz-gold rounded-full text-sm font-medium hover:bg-himaz-brown-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-himaz-brown"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-himaz-cream pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-display font-semibold text-himaz-brown"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-6 border-t border-himaz-brown/10">
                <a
                  href={getWhatsAppLink('Hello Himaz Properties! I am interested in viewing available properties.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-himaz-brown text-himaz-gold rounded-full font-medium"
                >
                  <Phone className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <div className="flex items-center gap-2 mt-4 text-sm text-himaz-brown-light">
                  <MapPin className="w-4 h-4" />
                  Opp Urban Planning, Jimeta Yola
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}