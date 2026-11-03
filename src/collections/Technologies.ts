import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { auditChange, auditDelete } from '@/hooks/audit'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
    group: 'Website',
    defaultColumns: ['name', 'category', 'order', 'visible'],
  },
  access: { create: isAdmin, delete: isAdmin, read: () => true, update: isAdmin },
  hooks: {
    afterChange: [revalidateCollection('technologies'), auditChange('technologies')],
    afterDelete: [revalidateCollectionDelete('technologies'), auditDelete('technologies')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        'Frontend',
        'Backend',
        'AI & Machine Learning',
        'Blockchain',
        'Cloud Infrastructure',
        'Databases',
        'DevOps',
        'Cybersecurity',
      ],
    },
    { name: 'description', type: 'textarea', required: true },
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
