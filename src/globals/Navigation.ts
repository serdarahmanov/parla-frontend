import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Site' },
  access: { read: () => true },
  fields: [
    {
      name: 'servicesLabel',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Services',
    },
    {
      name: 'informationLabel',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Information',
    },
    {
      name: 'turkmenLanguageLabel',
      label: 'Turkmen Button Label',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'tk',
    },
    {
      name: 'englishLanguageLabel',
      label: 'English Button Label',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'en',
    },
  ],
}
