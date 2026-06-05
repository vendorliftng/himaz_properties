'use client'

import { MapPin, Phone, Mail, Instagram, Facebook, Globe } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-himaz-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-himaz-brown rounded-lg flex items-center justify-center">
                <span className="text-himaz-gold font-display font-bold text-lg">H</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">Himaz</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Properties Ltd</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Building legacies through verified real estate in Adamawa State, Nigeria. 
              Trusted by 500+ clients since inception.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-himaz-gold hover:text-himaz-brown transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-himaz-gold hover:text-himaz-brown transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-himaz-gold hover:text-himaz-brown transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Properties', 'Match Quiz', 'Calculator', 'Insights'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-white/60 hover:text-himaz-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Estates */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Estates</h4>
            <ul className="space-y-3">
              {['Sunshine City', 'Palm City', 'Arewa Estate', 'The Meridian Estate', 'Himaz Trade Center'].map((estate) => (
                <li key={estate}>
                  <a
                    href="#properties"
                    className="text-sm text-white/60 hover:text-himaz-gold transition-colors"
                  >
                    {estate}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-himaz-gold mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">
                  Opp Urban Planning State Low-cost, Jimeta Yola, Adamawa State
                </span>
              </li>
              <li>
                <a
                  href={getWhatsAppLink('Hello Himaz Properties!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-himaz-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-himaz-gold shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@himazproperties.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-himaz-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-himaz-gold shrink-0" />
                  info@himazproperties.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Himaz Properties Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/40">Verified Listings</span>
            <span className="text-xs text-white/40">Secure Transactions</span>
            <span className="text-xs text-white/40">Trusted Since Inception</span>
          </div>
        </div>
      </div>
    </footer>
  )
}