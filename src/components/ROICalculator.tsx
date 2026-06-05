'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Wallet, Ruler, Fence, Clock, TrendingUp } from 'lucide-react'

export default function ROICalculator() {
  const [budget, setBudget] = useState(2000000)
  const [landSize, setLandSize] = useState(450)
  const [years, setYears] = useState(5)
  const [includeFencing, setIncludeFencing] = useState(false)

  const results = useMemo(() => {
    // Appreciation rate: 15-25% annually (conservative 18%)
    const appreciationRate = 0.18
    const futureValue = budget * Math.pow(1 + appreciationRate, years)
    const appreciation = futureValue - budget

    // Fencing cost: roughly ₦15,000 per meter for 450sqm plot (approx 80m perimeter)
    const perimeter = Math.sqrt(landSize) * 4 * 0.8 // rough estimate
    const fencingCost = includeFencing ? perimeter * 15000 : 0

    // Total investment
    const totalInvestment = budget + fencingCost

    // ROI
    const roi = ((futureValue - totalInvestment) / totalInvestment) * 100

    return {
      futureValue: Math.round(futureValue),
      appreciation: Math.round(appreciation),
      fencingCost: Math.round(fencingCost),
      totalInvestment: Math.round(totalInvestment),
      roi: Math.round(roi),
      perimeter: Math.round(perimeter),
    }
  }, [budget, landSize, years, includeFencing])

  const formatNaira = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`
    }
    return `₦${amount.toLocaleString()}`
  }

  return (
    <section id="calculator" className="py-24 bg-himaz-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-himaz-brown mb-4">
            Investment <span className="text-gradient-gold">Calculator</span>
          </h2>
          <p className="text-himaz-brown-light text-lg max-w-xl mx-auto">
            Plan your investment with transparency. See projected returns, fencing costs, and land size estimates instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-himaz-brown rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-himaz-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-himaz-brown">Your Budget</h3>
            </div>

            <div className="space-y-8">
              {/* Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-himaz-brown">
                    <Wallet className="w-4 h-4 text-himaz-gold" />
                    Property Budget
                  </label>
                  <span className="text-lg font-bold text-himaz-brown">{formatNaira(budget)}</span>
                </div>
                <input
                  type="range"
                  min="250000"
                  max="5000000"
                  step="50000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-himaz-brown/10 rounded-lg appearance-none cursor-pointer accent-himaz-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-himaz-brown-light">
                  <span>₦250K</span>
                  <span>₦5M</span>
                </div>
              </div>

              {/* Land Size Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-himaz-brown">
                    <Ruler className="w-4 h-4 text-himaz-gold" />
                    Land Size (SQM)
                  </label>
                  <span className="text-lg font-bold text-himaz-brown">{landSize} SQM</span>
                </div>
                <input
                  type="range"
                  min="225"
                  max="900"
                  step="25"
                  value={landSize}
                  onChange={(e) => setLandSize(Number(e.target.value))}
                  className="w-full h-2 bg-himaz-brown/10 rounded-lg appearance-none cursor-pointer accent-himaz-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-himaz-brown-light">
                  <span>225 SQM</span>
                  <span>900 SQM</span>
                </div>
              </div>

              {/* Years Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-himaz-brown">
                    <Clock className="w-4 h-4 text-himaz-gold" />
                    Holding Period
                  </label>
                  <span className="text-lg font-bold text-himaz-brown">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-himaz-brown/10 rounded-lg appearance-none cursor-pointer accent-himaz-gold"
                />
                <div className="flex justify-between mt-1 text-xs text-himaz-brown-light">
                  <span>1 Year</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Fencing Toggle */}
              <button
                onClick={() => setIncludeFencing(!includeFencing)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  includeFencing
                    ? 'border-himaz-gold bg-himaz-gold/10'
                    : 'border-himaz-brown/10 hover:border-himaz-brown/30'
                }`}
              >
                <Fence className={`w-5 h-5 ${includeFencing ? 'text-himaz-gold' : 'text-himaz-brown-light'}`} />
                <div className="text-left">
                  <p className="font-medium text-himaz-brown">Include Fencing Estimate</p>
                  <p className="text-xs text-himaz-brown-light">~₦15,000 per meter perimeter</p>
                </div>
                <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  includeFencing ? 'border-himaz-gold bg-himaz-gold' : 'border-himaz-brown-light'
                }`}>
                  {includeFencing && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="glass rounded-3xl p-8 shadow-lg border-himaz-gold/20">
              <h3 className="font-display text-xl font-bold text-himaz-brown mb-6">Projected Returns</h3>

              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                  <span className="text-himaz-brown-light">Property Value ({years}Y)</span>
                  <span className="text-xl font-bold text-himaz-brown">{formatNaira(results.futureValue)}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-himaz-gold/10 rounded-xl border border-himaz-gold/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-himaz-gold" />
                    <span className="text-himaz-brown-light">Total Appreciation</span>
                  </div>
                  <span className="text-xl font-bold text-himaz-gold">+{formatNaira(results.appreciation)}</span>
                </div>

                {includeFencing && (
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <span className="text-himaz-brown-light">Fencing Cost (~{results.perimeter}m)</span>
                    <span className="text-lg font-semibold text-himaz-brown">{formatNaira(results.fencingCost)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-himaz-brown/5 rounded-xl">
                  <span className="text-himaz-brown-light font-medium">Total Investment</span>
                  <span className="text-xl font-bold text-himaz-brown">{formatNaira(results.totalInvestment)}</span>
                </div>

                <div className="p-6 bg-gradient-to-r from-himaz-brown to-himaz-brown-light rounded-xl text-white text-center">
                  <p className="text-white/70 text-sm mb-1">Return on Investment</p>
                  <p className="text-4xl font-bold text-himaz-gold">{results.roi}%</p>
                  <p className="text-white/60 text-xs mt-2">
                    Based on 18% annual appreciation rate (conservative estimate for Adamawa)
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/2348123456789?text=${encodeURIComponent(
                `Hello Himaz Properties! I used your ROI calculator with a budget of ${formatNaira(budget)} for ${landSize}sqm over ${years} years. I'd like to discuss investment options.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-8 py-4 bg-himaz-brown text-himaz-gold rounded-full font-semibold hover:bg-himaz-brown-light transition-colors"
            >
              Discuss This Investment on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}