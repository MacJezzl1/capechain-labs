import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { auditChange, auditDelete } from '@/hooks/audit'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    group: 'Operations',
    defaultColumns: ['name', 'businessEmail', 'service', 'status', 'createdAt'],
  },
  access: {
    create: ({ req }) => req.context.publicInquiry === true,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  hooks: { afterChange: [auditChange('inquiries')], afterDelete: [auditDelete('inquiries')] },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    { name: 'businessEmail', type: 'email', required: true },
    { name: 'company', type: 'text', maxLength: 160 },
    {
      name: 'service',
      type: 'select',
      required: true,
      options: [
        'Custom Software Development',
        'Artificial Intelligence & Automation',
        'Blockchain & Web3 Development',
        'Website & Digital Experience Development',
        'Digital Marketing & Business Technology',
        'Not sure yet',
      ],
    },
    {
      name: 'budget',
      type: 'select',
      required: true,
      options: ['Under R50k', 'R50k – R150k', 'R150k – R500k', 'R500k+', 'To be discussed'],
    },
    { name: 'description', type: 'textarea', required: true, minLength: 20, maxLength: 5000 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'reviewing', 'responded', 'closed'],
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins',
      },
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website',
      access: {
        create: () => false,
        update: ({ req }) => req.user?.collection === 'admins',
      },
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
