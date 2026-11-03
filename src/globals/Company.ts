import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Company: GlobalConfig = {
  slug: 'company',
  label: 'Company Profile',
  admin: { group: 'Website' },
  access: { read: () => true, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal('company')] },
  fields: [
    { name: 'name', type: 'text', required: true, defaultValue: 'CapeChain Labs' },
    {
      name: 'positioning',
      type: 'textarea',
      required: true,
      defaultValue: 'CapeChain Labs is where ambitious ideas become intelligent technology.',
    },
    {
      name: 'githubProfile',
      type: 'text',
      admin: { description: 'Official public GitHub profile URL. Leave empty until verified.' },
    },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'instagramUrl', type: 'text' },
    { name: 'xUrl', type: 'text' },
  ],
}
