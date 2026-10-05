import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Primary organization logo used in site-wide structured data.',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Browser tab icon used across the website.',
              },
            },
          ],
        },
        {
          name: 'websiteJsonLd',
          label: 'Website JSON-LD',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              defaultValue: 'Parla',
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Describes the website itself, separately from any page meta description.',
              },
            },
            {
              name: 'alternateNames',
              type: 'array',
              fields: [{ name: 'value', type: 'text', required: true, label: 'Name' }],
            },
          ],
        },
        {
          name: 'organizationJsonLd',
          label: 'Organization JSON-LD',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              defaultValue: 'Parla',
            },
            { name: 'legalName', type: 'text', label: 'Legal Name' },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'email', type: 'email' },
            { name: 'telephone', type: 'text' },
            { name: 'streetAddress', type: 'text', localized: true },
            { name: 'addressLocality', type: 'text', localized: true, label: 'City' },
            {
              name: 'addressCountry',
              type: 'text',
              label: 'Country Code',
              defaultValue: 'TM',
            },
            {
              name: 'socialProfiles',
              type: 'array',
              label: 'Social Profile URLs',
              fields: [{ name: 'url', type: 'text', required: true }],
            },
          ],
        },
        {
          name: 'additionalJsonLd',
          label: 'Additional JSON-LD',
          fields: [
            {
              name: 'entries',
              type: 'array',
              admin: {
                description: 'Optional structured-data objects that apply across the entire website.',
              },
              fields: [
                { name: 'name', type: 'text', required: true, label: 'Admin Name' },
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                {
                  name: 'data',
                  type: 'json',
                  required: true,
                  label: 'JSON-LD Object',
                  admin: {
                    description: 'Enter one complete schema.org object. @context is added automatically when omitted.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
