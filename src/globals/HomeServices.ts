import type { GlobalConfig } from 'payload'

export const HomeServices: GlobalConfig = {
  slug: 'home-services',
  label: '04 — Software Engineering Section',
  admin: { group: 'Home Page' },
  access: { read: () => true },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'software, step by step' },
    {
      name: 'items',
      label: 'Steps',
      type: 'array',
      minRows: 5,
      maxRows: 5,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
