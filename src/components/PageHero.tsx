import { Reveal } from './Reveal'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(71,123,255,0.15),transparent_35%)]" />
      <Reveal className="relative mx-auto max-w-7xl">
        <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
        <h1 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
      </Reveal>
    </section>
  )
}
