'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Home, Building, TrendingUp } from 'lucide-react'
import { properties } from '@/lib/data'
import PropertyCard from './PropertyCard'

const filters = [
  { label: 'All', value: 'all', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'Residential', value: 'residential', icon: <Home className="w-4 h-4" /> },
  { label: 'Commercial', value: 'commercial', icon: <Building className="w-4 h-4" /> },
]

export default function PropertyGrid() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? properties
      : properties.filter((p) => p.type === activeFilter)

  return (
    <section id="properties" className="py-24 bg-himaz-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-himaz-brown mb-4">
            Featured <span className="text-gradient-gold">Estates</span>
          </h2>
          <p className="text-himaz-brown-light text-lg max-w-xl mx-auto">
            Handpicked properties in Adamawa&apos;s most promising locations. 
            Each listing is verified with clear documentation.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 p-1.5 bg-white rounded-full shadow-sm border border-himaz-brown/10">
            <SlidersHorizontal className="w-4 h-4 text-himaz-brown-light ml-3" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.value
                    ? 'bg-himaz-brown text-himaz-gold shadow-md'
                    : 'text-himaz-brown-light hover:text-himaz-brown'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}