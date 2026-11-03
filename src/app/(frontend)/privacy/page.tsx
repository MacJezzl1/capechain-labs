import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
export const metadata: Metadata = { title: 'Privacy Policy' }
export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy placeholder."
        description="CapeChain Labs must provide and approve its final privacy policy before public launch. Contact inquiries are stored privately for business follow-up and are not exposed publicly."
      />
    </main>
  )
}
