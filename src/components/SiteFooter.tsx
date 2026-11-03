import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Brand } from './Brand'
import { navItems } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07080a] px-5 py-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">
            Engineering intelligent software, digital products and infrastructure for ambitious
            organisations.
          </p>
        </div>
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-zinc-600">Navigate</p>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-zinc-600">Connect</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-cyan-300"
            >
              Begin a conversation <ArrowUpRight size={15} />
            </Link>
            <a
              href="https://www.linkedin.com/company/capechain-labs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
            >
              LinkedIn <ArrowUpRight size={14} className="text-zinc-600" />
            </a>
            <a
              href="https://github.com/MacJezzl1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
            >
              GitHub <ArrowUpRight size={14} className="text-zinc-600" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CapeChain Labs. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/admin/inquiries">Console</Link>
          <a href="#root">Back to top</a>
        </div>
      </div>
    </footer>
  )
}
