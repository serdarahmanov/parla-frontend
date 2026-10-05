import type { GlobalConfig } from 'payload'

export const ServicesHeader: GlobalConfig = {
  slug: 'services-header',
  label: '02 — Service Catalog Page',
  admin: { group: 'Services Page' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              defaultValue: 'What We Do',
            },
            {
              name: 'introduction',
              type: 'textarea',
              localized: true,
            },
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
              defaultValue: 'Services | Parla',
              admin: {
                description: 'Browser title and social sharing title for the Services catalog page.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              required: true,
              admin: {
                description: 'Search-engine and social sharing description for the Services catalog page.',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Open Graph and social sharing image for the Services catalog page.',
              },
            },
          ],
        },
      ],
    },
  ],
}
