import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { auditChange, auditDelete } from '@/hooks/audit'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Website',
    defaultColumns: ['title', 'eyebrow', 'order', 'visible'],
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidateCollection('services'), auditChange('services')],
    afterDelete: [revalidateCollectionDelete('services'), auditDelete('services')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'title' },
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'problems', type: 'array', fields: [{ name: 'item', type: 'text', required: true }] },
    {
      name: 'deliverables',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    { name: 'visible', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
