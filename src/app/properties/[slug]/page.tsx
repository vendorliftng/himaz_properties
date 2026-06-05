import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPropertyBySlug, properties, getWhatsAppLink, formatPrice } from '@/lib/data'
import { MapPin, Shield, Check, Phone, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug)
  if (!property) return { title: 'Property Not Found' }

  return {
    title: `${property.name} | ${property.tagline} — Himaz Properties`,
    description: property.description,
    openGraph: {
      title: property.name,
      description: property.description,
      type: 'website',
    },
  }
}

export default function PropertyPage({ params }: Props) {
  const property = getPropertyBySlug(params.slug)
  if (!property) return notFound()

  const minPrice = Math.min(...property.units.map((u) => u.price))

  return (
    <main className="min-h-screen bg-himaz-cream">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-himaz-brown hover:text-himaz-gold transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-himaz-brown-light mb-6">
            <Link href="/" className="hover:text-himaz-brown">Home</Link>
            <span>/</span>
            <span className="text-himaz-brown">{property.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-[4/3] bg-gradient-to-br from-himaz-brown to-himaz-brown-light rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.3)_0%,transparent_70%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl font-bold text-white/10">{property.name.charAt(0)}</span>
              </div>
              <div className="absolute top-6 left-6">
                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold ${
                  property.status === 'available' ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30' :
                  property.status === 'selling_fast' ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30' :
                  'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}>
                  {property.status === 'available' && <Shield className="w-4 h-4" />}
                  {property.status === 'available' ? 'Available' : property.status === 'selling_fast' ? 'Selling Fast' : 'Sold Out'}
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-himaz-brown capitalize">
                  {property.type}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-himaz-brown mb-2">
                {property.name}
              </h1>
              <p className="text-lg text-himaz-gold font-medium mb-4">{property.tagline}</p>
              <p className="flex items-center gap-2 text-himaz-brown-light mb-6">
                <MapPin className="w-4 h-4" />
                {property.location}
              </p>
              <p className="text-himaz-brown-light leading-relaxed mb-8">
                {property.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-himaz-brown">{formatPrice(minPrice)}</span>
                <span className="text-himaz-brown-light">starting price</span>
              </div>

              <a
                href={getWhatsAppLink(`Hello Himaz Properties! I'm interested in ${property.name} (${property.tagline}). Please send me more details and availability.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-himaz-brown text-himaz-gold rounded-full font-semibold hover:bg-himaz-brown-light transition-colors w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Units */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-himaz-brown mb-8">Available Units</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.units.map((unit) => (
              <div key={unit.id} className="glass rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="aspect-video bg-gradient-to-br from-himaz-brown/10 to-himaz-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="font-display text-3xl font-bold text-himaz-brown/20">{unit.title.charAt(0)}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-himaz-brown mb-1">{unit.title}</h3>
                <p className="text-sm text-himaz-brown-light mb-1">{unit.landSize}</p>
                <p className="text-sm text-himaz-brown-light/70 mb-4">{unit.dimensions}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-himaz-gold">{unit.priceFormatted}</span>
                  <a
                    href={getWhatsAppLink(`Hello Himaz Properties! I'm interested in the ${unit.title} at ${property.name} (${unit.landSize}, ${unit.dimensions}) priced at ${unit.priceFormatted}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-himaz-brown text-himaz-gold rounded-full text-sm font-medium hover:bg-himaz-brown-light transition-colors"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-himaz-brown mb-8">Payment Plans</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.paymentPlans.map((plan, index) => (
              <div key={index} className="glass rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="font-display text-lg font-bold text-himaz-brown mb-4">{plan.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-himaz-gold/10 rounded-xl">
                    <span className="text-sm text-himaz-brown-light">Down Payment</span>
                    <span className="font-bold text-himaz-brown">{plan.downPayment}</span>
                  </div>
                  {plan.installments.map((inst, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                      <span className="text-sm text-himaz-brown-light">{inst.label}</span>
                      <span className="font-medium text-himaz-brown">{inst.amount}</span>
                    </div>
                  ))}
                  {plan.discount && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl text-emerald-700 text-sm">
                      <Check className="w-4 h-4" />
                      {plan.discount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-himaz-brown mb-8">Estate Facilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.facilities.map((facility) => (
              <div key={facility} className="flex items-center gap-3 p-4 glass rounded-xl">
                <Check className="w-5 h-5 text-himaz-gold shrink-0" />
                <span className="text-sm font-medium text-himaz-brown">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-himaz-brown">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Secure Your <span className="text-himaz-gold">{property.name}</span> Plot?
          </h2>
          <p className="text-white/70 mb-8">
            Our team is available on WhatsApp to answer your questions and guide you through the purchase process.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={getWhatsAppLink(`Hello Himaz Properties! I want to book an inspection for ${property.name}. When is the next available date?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-himaz-gold text-himaz-brown rounded-full font-semibold hover:bg-himaz-gold-light transition-colors"
            >
              Book Site Inspection
            </a>
            <Link
              href="/"
              className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              View More Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-himaz-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Himaz Properties Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}