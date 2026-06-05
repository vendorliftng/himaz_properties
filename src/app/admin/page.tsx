'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  Phone,
  Mail,
  Calendar,
  Search,
  Filter,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  interest: string
  budget: string | null
  message: string | null
  source: string
  status: string
  created_at: string
}

const mockLeads: Lead[] = [
  {
    id: 'lead_1',
    name: 'Abubakar Ibrahim',
    phone: '+2348012345678',
    email: 'abubakar@email.com',
    interest: 'Sunshine City',
    budget: '₦2M - ₦3M',
    message: 'Interested in a 4 bedroom bungalow',
    source: 'website',
    status: 'new',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lead_2',
    name: 'Fatima Yusuf',
    phone: '+2348098765432',
    email: null,
    interest: 'The Meridian Estate',
    budget: 'Under ₦500K',
    message: 'Looking for investment plot',
    source: 'website',
    status: 'contacted',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'lead_3',
    name: 'Musa Danladi',
    phone: '+2348056789012',
    email: 'musa.d@email.com',
    interest: 'Himaz Trade Center',
    budget: '₦5M+',
    message: 'Want to buy a warehouse',
    source: 'quiz',
    status: 'qualified',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: <AlertCircle className="w-3 h-3" /> },
  contacted: { label: 'Contacted', color: 'bg-amber-100 text-amber-700', icon: <Phone className="w-3 h-3" /> },
  qualified: { label: 'Qualified', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle className="w-3 h-3" /> },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700', icon: <TrendingUp className="w-3 h-3" /> },
}

export default function AdminDashboard() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('himaz_admin')
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    async function fetchLeads() {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase!
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          setLeads(data as Lead[])
          setFilteredLeads(data as Lead[])
        }
      }
      setLoading(false)
    }

    fetchLeads()
  }, [router])

  useEffect(() => {
    let result = leads

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.interest.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((l) => l.status === statusFilter)
    }

    setFilteredLeads(result)
  }, [searchQuery, statusFilter, leads])

  const handleLogout = () => {
    sessionStorage.removeItem('himaz_admin')
    router.push('/admin/login')
  }

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-himaz-cream flex items-center justify-center">
        <div className="animate-pulse text-himaz-brown-light">Loading dashboard...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-himaz-cream">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-himaz-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-himaz-brown rounded-lg flex items-center justify-center">
                <span className="text-himaz-gold font-display font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-himaz-brown">Himaz Admin</h1>
                <p className="text-[10px] text-himaz-brown-light uppercase tracking-wider">Lead Pipeline</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-himaz-brown-light hover:text-himaz-brown transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, icon: <Users className="w-5 h-5" />, color: 'bg-himaz-brown text-himaz-gold' },
            { label: 'New', value: stats.new, icon: <AlertCircle className="w-5 h-5" />, color: 'bg-blue-500 text-white' },
            { label: 'Contacted', value: stats.contacted, icon: <Phone className="w-5 h-5" />, color: 'bg-amber-500 text-white' },
            { label: 'Qualified', value: stats.qualified, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-emerald-500 text-white' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-himaz-brown">{stat.value}</p>
                <p className="text-xs text-himaz-brown-light">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himaz-brown-light" />
            <input
              type="text"
              placeholder="Search by name, phone, or interest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-himaz-brown-light" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-himaz-brown/10 bg-white/50 focus:outline-none focus:ring-2 focus:ring-himaz-gold/50 text-sm text-himaz-brown"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-himaz-brown/10">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-himaz-brown-light uppercase tracking-wider">Lead</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-himaz-brown-light uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-himaz-brown-light uppercase tracking-wider">Interest</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-himaz-brown-light uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-himaz-brown-light uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-himaz-brown-light">
                      No leads found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const status = statusConfig[lead.status] || statusConfig.new
                    return (
                      <tr key={lead.id} className="border-b border-himaz-brown/5 hover:bg-white/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-himaz-brown/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-himaz-brown">
                                {lead.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-himaz-brown text-sm">{lead.name}</p>
                              {lead.budget && (
                                <p className="text-xs text-himaz-brown-light">{lead.budget}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\+/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-himaz-brown hover:text-emerald-600 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {lead.phone}
                            </a>
                            {lead.email && (
                              <p className="flex items-center gap-1.5 text-xs text-himaz-brown-light">
                                <Mail className="w-3.5 h-3.5" />
                                {lead.email}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-himaz-brown">{lead.interest}</p>
                          {lead.message && (
                            <p className="text-xs text-himaz-brown-light line-clamp-1 max-w-xs">
                              &ldquo;{lead.message}&rdquo;
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-himaz-brown-light">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(lead.created_at).toLocaleDateString('en-NG', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-himaz-brown-light/60 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.created_at).toLocaleTimeString('en-NG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        {!isSupabaseConfigured() && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Supabase Not Configured</p>
              <p className="text-xs text-amber-700 mt-1">
                Add <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
                <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{' '}
                <code className="bg-amber-100 px-1 rounded">.env.local</code> file to persist leads. 
                Currently showing demo data.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
