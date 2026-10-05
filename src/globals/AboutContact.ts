import type { GlobalConfig } from 'payload'

export const AboutContact: GlobalConfig = {
  slug: 'about-contact',
  label: '03 — Contact, Office & Hours',
  admin: { group: 'About Page' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Contact',
            },
            {
              name: 'contactLinks',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', localized: true, required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Office',
          fields: [
            {
              name: 'officeHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Office',
            },
            { name: 'address', type: 'textarea', localized: true },
          ],
        },
        {
          label: 'Hours',
          fields: [
            {
              name: 'hoursHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Working Hours',
            },
            { name: 'workingDays', type: 'text', localized: true },
            { name: 'workingHours', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
}
