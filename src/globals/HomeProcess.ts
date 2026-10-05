import type { GlobalConfig } from 'payload'

export const HomeProcess: GlobalConfig = {
  slug: 'home-process',
  label: '05 — Design Section',
  admin: { group: 'Home Page' },
  access: { read: () => true },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
