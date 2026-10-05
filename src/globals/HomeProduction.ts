import type { GlobalConfig } from 'payload'

export const HomeProduction: GlobalConfig = {
  slug: 'home-production',
  label: '02 — Production Section',
  admin: { group: 'Home Page' },
  access: { read: () => true },
  fields: [
    {
      name: 'projects',
      type: 'array',
      fields: [
        { name: 'clientName', type: 'text', localized: true, required: true },
        { name: 'projectName', type: 'text', localized: true, required: true },
        { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
        { name: 'video', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
