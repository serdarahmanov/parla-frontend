import type { GlobalConfig } from 'payload'

export const AboutIntro: GlobalConfig = {
  slug: 'about-intro',
  label: '01 — Introduction',
  admin: { group: 'About Page' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'statement', type: 'textarea', localized: true, required: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              required: true,
              defaultValue: 'About | Parla',
              admin: {
                description: 'Browser title and social sharing title for the Information page.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'Learn how Parla helps brands grow through strategy, creative direction, production planning, and long-term content systems.',
              admin: {
                description: 'Search-engine and social sharing description for the Information page.',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Open Graph and social sharing image for the Information page.',
              },
            },
          ],
        },
      ],
    },
  ],
}
