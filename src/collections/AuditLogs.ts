import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'collection',
    group: 'Operations',
    defaultColumns: ['action', 'collection', 'documentId', 'actor', 'createdAt'],
  },
  access: { create: () => false, delete: () => false, read: isAdmin, update: () => false },
  fields: [
    { name: 'action', type: 'text', required: true },
    { name: 'collection', type: 'text', required: true },
    { name: 'documentId', type: 'text', required: true },
    { name: 'actor', type: 'relationship', relationTo: 'admins', required: true },
  ],
  timestamps: true,
}
