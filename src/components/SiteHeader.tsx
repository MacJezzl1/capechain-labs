'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Brand } from './Brand'
import { navItems } from '@/lib/content'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#08090c]/75 px-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Brand />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-zinc-400 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-cyan-200 md:block"
        >
          Start a project
        </Link>
        <button
          className="grid size-10 place-items-center text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-2xl border border-white/10 bg-[#0c0e13]/95 p-3 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
