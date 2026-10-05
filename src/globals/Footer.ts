import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Site' },
  access: { read: () => true },
  fields: [
    {
      name: 'cookiePolicyLabel',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Cookie Policy',
    },
    {
      name: 'privacyPolicyLabel',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Privacy Policy',
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'PARLA® ©2024',
    },
    {
      name: 'credit',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'site by Rahmanov',
    },
  ],
}
