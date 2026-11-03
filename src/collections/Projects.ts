import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { auditChange, auditDelete } from '@/hooks/audit'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    group: 'Website',
    defaultColumns: ['name', 'category', 'status', 'featured', 'visible'],
  },
  access: { create: isAdmin, delete: isAdmin, read: () => true, update: isAdmin },
  hooks: {
    afterChange: [revalidateCollection('projects'), auditChange('projects')],
    afterDelete: [revalidateCollectionDelete('projects'), auditDelete('projects')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'name' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'problem', type: 'textarea' },
    { name: 'architecture', type: 'textarea' },
    { name: 'category', type: 'text', required: true },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'screenshots',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: ['Concept', 'In development', 'Live', 'Maintained'],
      admin: { position: 'sidebar' },
    },
    { name: 'repositoryUrl', type: 'text' },
    { name: 'liveUrl', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'visible', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
