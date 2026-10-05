import type { GlobalConfig } from 'payload'

export const AboutCapabilities: GlobalConfig = {
  slug: 'about-capabilities',
  label: '02 — Capabilities & Clients',
  admin: { group: 'About Page' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Capabilities',
          fields: [
            {
              name: 'capabilitiesHeading',
              type: 'text',
              localized: true,
              defaultValue: 'What We Do',
            },
            {
              name: 'capabilitiesText',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Clients',
          fields: [
            {
              name: 'clientsHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Clients',
            },
            {
              name: 'clients',
              type: 'array',
              fields: [{ name: 'name', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
  ],
}
