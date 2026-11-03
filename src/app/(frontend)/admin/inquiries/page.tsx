'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  Copy,
  Download,
  Filter,
  Mail,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react'

type Inquiry = {
  id: string | number
  name: string
  email: string
  company: string
  service: string
  budget: string
  description: string
  createdAt: string
  source?: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('ALL')
  const [adminKey, setAdminKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [copiedId, setCopiedId] = useState<string | number | null>(null)

  // Try to load key from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ccl_admin_key') || 'ccl_admin_2026'
    setAdminKey(saved)
    fetchInquiries(saved)
  }, [])

  async function fetchInquiries(keyToUse: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/inquiries?key=${encodeURIComponent(keyToUse)}`)
      if (res.status === 401) {
        setAuthenticated(false)
        setError('Unauthorized. Please enter the valid Admin Secret Key.')
        setLoading(false)
        return
      }
      if (!res.ok) {
        throw new Error('Failed to retrieve inquiries')
      }
      const data = await res.json()
      setInquiries(data.inquiries || [])
      setAuthenticated(true)
      localStorage.setItem('ccl_admin_key', keyToUse)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading inquiries')
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    fetchInquiries(adminKey)
  }

  function copyToClipboard(text: string, id: string | number) {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchSearch =
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.company?.toLowerCase().includes(search.toLowerCase()) ||
        inq.description.toLowerCase().includes(search.toLowerCase())

      const matchService = serviceFilter === 'ALL' || inq.service === serviceFilter
      return matchSearch && matchService
    })
  }, [inquiries, search, serviceFilter])

  const serviceOptions = useMemo(() => {
    const set = new Set(inquiries.map((i) => i.service).filter(Boolean))
    return ['ALL', ...Array.from(set)]
  }, [inquiries])

  return (
    <div className="min-h-screen bg-[#08090c] text-white pt-28 pb-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white mb-2 transition"
            >
              <ArrowLeft size={14} /> Back to Digital Headquarters
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight">Project Inquiries Console</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Secure triage system for client briefs, project scopes, and engineering requests.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchInquiries(adminKey)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-zinc-300 hover:bg-white/10 transition disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <a
              href={`/api/inquiries?key=${encodeURIComponent(adminKey)}&format=csv`}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-black hover:bg-cyan-300 transition"
            >
              <Download size={14} /> Export CSV
            </a>
          </div>
        </div>

        {/* Authentication Modal / Lock if unauthorized */}
        {!authenticated && !loading ? (
          <div className="max-w-md mx-auto my-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-300 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-medium">Administrator Access Required</h2>
            <p className="text-xs text-zinc-500 mt-2 mb-6">
              Enter the CapeChain Labs Admin Secret Key to view and manage client inquiries.
            </p>
            <form onSubmit={handleLogin} className="grid gap-3">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter ADMIN_SECRET_KEY"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-cyan-200 transition"
              >
                Authenticate Console
              </button>
            </form>
            {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Total Inquiries</p>
                <p className="text-3xl font-semibold mt-2 text-white">{inquiries.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Active Storage</p>
                <p className="text-lg font-medium mt-2 text-cyan-300 capitalize">
                  {inquiries[0]?.source || 'Database / Ready'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Filtered Count</p>
                <p className="text-3xl font-semibold mt-2 text-white">{filteredInquiries.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">SLA Response</p>
                <p className="text-lg font-medium mt-2 text-emerald-400">&lt; 24h Target</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  placeholder="Search by client name, email, company or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-zinc-500 hidden sm:block" />
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-zinc-300 outline-none focus:border-cyan-400"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-zinc-900 text-white">
                      {opt === 'ALL' ? 'All Services' : opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inquiries List */}
            {loading ? (
              <div className="py-20 text-center text-zinc-500">
                <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-cyan-400" />
                Loading inquiries from database...
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center text-zinc-500">
                <p className="text-lg font-medium text-white mb-2">No Inquiries Found</p>
                <p className="text-xs max-w-md mx-auto">
                  {inquiries.length === 0
                    ? 'Submissions made on the /contact form will be automatically saved to your database and displayed here.'
                    : 'No submissions match your current search or filter criteria.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredInquiries.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                          {item.company && (
                            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                              <Building2 size={12} /> {item.company}
                            </span>
                          )}
                          <span className="text-[10px] text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                            {item.service}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-zinc-400">
                          <a
                            href={`mailto:${item.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition"
                          >
                            <Mail size={13} className="text-cyan-400" /> {item.email}
                          </a>
                          <button
                            onClick={() => copyToClipboard(item.email, item.id)}
                            className="text-zinc-500 hover:text-white inline-flex items-center gap-1"
                            title="Copy Email"
                          >
                            {copiedId === item.id ? (
                              <Check size={12} className="text-emerald-400" />
                            ) : (
                              <Copy size={12} />
                            )}
                            <span className="text-[10px]">{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-end gap-1.5 text-right">
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                          {item.budget}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                          <Calendar size={11} /> {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">
                        Project Scope &amp; Brief
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-white/5">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-zinc-500">
                      <span>Inquiry ID: <code className="text-zinc-400">{item.id}</code></span>
                      <a
                        href={`mailto:${item.email}?subject=CapeChain%20Labs%20Project%20Discussion&body=Hi%20${encodeURIComponent(item.name)},%0D%0A%0D%0AThank%20you%20for%20reaching%20out%20to%20CapeChain%20Labs%20regarding%20your%20${encodeURIComponent(item.service)}%20project.`}
                        className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline"
                      >
                        Reply to Client &rarr;
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
