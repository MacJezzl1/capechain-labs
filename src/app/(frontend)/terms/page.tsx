import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
export const metadata: Metadata = { title: 'Terms of Service' }
export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms of service placeholder."
        description="CapeChain Labs must provide and approve its final terms of service before public launch. No contractual terms have been fabricated for this experience."
      />
    </main>
  )
}
