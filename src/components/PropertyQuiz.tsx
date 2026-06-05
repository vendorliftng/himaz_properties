'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RotateCcw, Home, Building, TrendingUp, Calendar, CheckCircle } from 'lucide-react'
import { properties, getWhatsAppLink } from '@/lib/data'
import type { Property } from '@/lib/data'

interface QuizStep {
  id: number
  question: string
  options: { label: string; value: string; icon: React.ReactNode }[]
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: 'What type of property are you looking for?',
    options: [
      { label: 'Residential Plot / Home', value: 'residential', icon: <Home className="w-5 h-5" /> },
      { label: 'Commercial / Business', value: 'commercial', icon: <Building className="w-5 h-5" /> },
      { label: 'Investment / Any', value: 'investment', icon: <TrendingUp className="w-5 h-5" /> },
    ],
  },
  {
    id: 2,
    question: 'What is your budget range?',
    options: [
      { label: 'Under ₦500K', value: '0-500000', icon: <span className="text-sm font-bold">₦</span> },
      { label: '₦500K — ₦1.5M', value: '500000-1500000', icon: <span className="text-sm font-bold">₦₦</span> },
      { label: '₦1.5M — ₦3M', value: '1500000-3000000', icon: <span className="text-sm font-bold">₦₦₦</span> },
      { label: 'Above ₦3M', value: '3000000+', icon: <span className="text-sm font-bold">₦₦₦₦</span> },
    ],
  },
  {
    id: 3,
    question: 'When do you plan to purchase?',
    options: [
      { label: 'Immediately', value: 'immediate', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Within 3 months', value: '3months', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Within 6 months', value: '6months', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Just browsing', value: 'browsing', icon: <Calendar className="w-5 h-5" /> },
    ],
  },
]

export default function PropertyQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [matches, setMatches] = useState<Property[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [quizSteps[step].id]: value }
    setAnswers(newAnswers)

    if (step < quizSteps.length - 1) {
      setStep(step + 1)
    } else {
      // Calculate matches
      const matched = properties.filter((p) => {
        const typeMatch =
          newAnswers[1] === 'investment' ? true :
          newAnswers[1] === 'residential' ? p.type === 'residential' :
          newAnswers[1] === 'commercial' ? p.type === 'commercial' :
          true

        const minPrice = Math.min(...p.units.map((u) => u.price))
        const budgetMatch =
          newAnswers[2] === '0-500000' ? minPrice <= 500000 :
          newAnswers[2] === '500000-1500000' ? minPrice <= 1500000 :
          newAnswers[2] === '1500000-3000000' ? minPrice <= 3000000 :
          true

        return typeMatch && budgetMatch
      })

      setMatches(matched.length > 0 ? matched : properties)
      setShowResults(true)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setShowResults(false)
    setMatches([])
  }

  return (
    <section id="quiz" className="py-24 bg-himaz-brown relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-himaz-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-himaz-gold/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Find Your <span className="text-himaz-gold">Perfect Match</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Answer 3 quick questions and we will curate a personalized property list for you.
          </p>
        </motion.div>

        <div className="glass-dark rounded-3xl p-8 sm:p-12">
          {!showResults ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                  {quizSteps.map((s, i) => (
                    <div
                      key={s.id}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= step ? 'bg-himaz-gold' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-2xl font-display font-semibold text-white mb-6">
                  {quizSteps[step].question}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {quizSteps[step].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-himaz-gold/20 hover:border-himaz-gold/50 transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-himaz-gold group-hover:bg-himaz-gold group-hover:text-himaz-brown transition-colors">
                        {option.icon}
                      </div>
                      <span className="font-medium">{option.label}</span>
                      <ChevronRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-himaz-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-himaz-gold" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  We Found {matches.length} Match{matches.length !== 1 ? 'es' : ''}!
                </h3>
                <p className="text-white/60">
                  Based on your preferences, these properties suit you best.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {matches.slice(0, 3).map((property) => (
                  <a
                    key={property.id}
                    href={`#properties`}
                    onClick={() => {
                      const el = document.getElementById('properties')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg bg-himaz-brown flex items-center justify-center text-himaz-gold font-display font-bold text-xl">
                      {property.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{property.name}</h4>
                      <p className="text-sm text-white/60">{property.tagline}</p>
                      <p className="text-sm text-himaz-gold mt-1">
                        From {property.units[0]?.priceFormatted}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={getWhatsAppLink(`Hello Himaz Properties! I completed your property match quiz and I'm interested in ${matches.map(m => m.name).join(', ')}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-himaz-gold text-himaz-brown rounded-full font-semibold hover:bg-himaz-gold-light transition-colors"
                >
                  Enquire About Matches
                </a>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}