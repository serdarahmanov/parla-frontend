import type { GlobalConfig } from 'payload'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: '01 — Hero',
  admin: { group: 'Home Page' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'location', type: 'text', localized: true, defaultValue: 'Turkmenistan' },
            {
              name: 'headline',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'Parla is a production and software studio.',
            },
            {
              name: 'supportingText',
              type: 'textarea',
              localized: true,
              defaultValue: 'We combine established production expertise with new digital capabilities.',
            },
            { name: 'email', type: 'email', required: true, defaultValue: 'hello@parla.com' },
            { name: 'copySuccessLabel', type: 'text', localized: true, defaultValue: 'Copied!' },
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
              defaultValue: 'Parla',
              admin: {
                description: 'Browser title and social sharing title for the home page.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'Digital Marketing Agency',
              admin: {
                description: 'Search-engine and social sharing description for the home page.',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Open Graph and social sharing image for the home page.',
              },
            },
          ],
        },
      ],
    },
  ],
}
