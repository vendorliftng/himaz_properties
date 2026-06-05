'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight, Shield } from 'lucide-react'
import type { Property } from '@/lib/data'

interface PropertyCardProps {
  property: Property
  index: number
}

const statusConfig = {
  available: {
    label: 'Available',
    className: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
  },
  selling_fast: {
    label: 'Selling Fast',
    className: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  },
  sold_out: {
    label: 'Sold Out',
    className: 'bg-red-500/20 text-red-700 border-red-500/30',
  },
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const status = statusConfig[property.status]
  const minPrice = Math.min(...property.units.map((u) => u.price))
  const maxPrice = Math.max(...property.units.map((u) => u.price))

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <a href={`/properties/${property.slug}`} className="block">
        <div className="glass rounded-2xl overflow-hidden border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          {/* Image Area */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-himaz-brown to-himaz-brown-light overflow-hidden">
            {/* Placeholder pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.3)_0%,transparent_70%)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-5xl font-bold text-white/20">
                {property.name.charAt(0)}
              </span>
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${status.className}`}>
                {property.status === 'available' && <Shield className="w-3 h-3" />}
                {status.label}
              </span>
            </div>

            {/* Type Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-himaz-brown capitalize">
                {property.type}
              </span>
            </div>

            {/* Price Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-himaz-brown/90 to-transparent">
              <p className="text-himaz-gold font-bold text-lg">
                {property.units.length === 1
                  ? property.units[0].priceFormatted
                  : `${property.units[0]?.priceFormatted} — ${property.units[property.units.length - 1]?.priceFormatted}`}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display text-xl font-bold text-himaz-brown group-hover:text-himaz-gold transition-colors">
                {property.name}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-himaz-brown-light opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <p className="text-sm text-himaz-brown-light mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {property.tagline}
            </p>

            <p className="text-sm text-himaz-brown-light/80 line-clamp-2 mb-4">
              {property.description}
            </p>

            {/* Facilities Preview */}
            <div className="flex flex-wrap gap-2">
              {property.facilities.slice(0, 4).map((facility) => (
                <span
                  key={facility}
                  className="px-2.5 py-1 rounded-md bg-himaz-brown/5 text-xs text-himaz-brown-light"
                >
                  {facility}
                </span>
              ))}
              {property.facilities.length > 4 && (
                <span className="px-2.5 py-1 rounded-md bg-himaz-brown/5 text-xs text-himaz-brown-light">
                  +{property.facilities.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}