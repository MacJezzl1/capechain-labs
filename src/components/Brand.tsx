import Image from 'next/image'
import Link from 'next/link'

export function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="CapeChain Labs home">
      <span className="relative size-9 overflow-hidden rounded-lg bg-white">
        <Image
          src="/capechain-logo.png"
          alt=""
          fill
          sizes="36px"
          className="scale-[1.9] object-contain"
        />
      </span>
      <span className="text-sm font-semibold tracking-[-0.02em] text-white">
        CapeChain <span className="text-cyan-300">Labs</span>
      </span>
    </Link>
  )
}
