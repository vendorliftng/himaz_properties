'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Home, Building, TrendingUp, HelpCircle } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/data'

const quickActions = [
  {
    label: 'View Residential',
    message: 'Hello Himaz Properties! I am interested in residential plots and homes.',
    icon: <Home className="w-4 h-4" />,
  },
  {
    label: 'View Commercial',
    message: 'Hello Himaz Properties! I am interested in commercial properties.',
    icon: <Building className="w-4 h-4" />,
  },
  {
    label: 'Investment Advice',
    message: 'Hello Himaz Properties! I would like investment advice for Adamawa real estate.',
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    label: 'General Enquiry',
    message: 'Hello Himaz Properties! I have a question.',
    icon: <HelpCircle className="w-4 h-4" />,
  },
]

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-dark rounded-2xl p-5 w-72 shadow-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Chat with Us</h4>
                <p className="text-xs text-white/50">Typically replies instantly</p>
              </div>
            </div>

            <div className="space-y-2">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={getWhatsAppLink(action.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <span className="text-himaz-gold">{action.icon}</span>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>

            <p className="text-[10px] text-white/30 text-center mt-3">
              Powered by Himaz Properties
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
