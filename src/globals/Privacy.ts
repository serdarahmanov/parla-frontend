import type { GlobalConfig } from 'payload'

export const Privacy: GlobalConfig = {
  slug: 'privacy',
  label: 'Privacy',
  admin: { group: 'Policies' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Privacy Policy',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Content',
                  fields: [
                    {
                      name: 'privacyTitle',
                      label: 'Title',
                      type: 'text',
                      localized: true,
                      required: true,
                      defaultValue: 'Privacy Policy',
                    },
                    {
                      name: 'privacyLastUpdatedLabel',
                      label: 'Last Updated Label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'privacyLastUpdated',
                      label: 'Last Updated',
                      type: 'date',
                    },
                    {
                      name: 'privacySections',
                      label: 'Policy Sections',
                      type: 'array',
                      minRows: 1,
                      fields: [
                        { name: 'heading', type: 'text', localized: true, required: true },
                        { name: 'content', type: 'richText', localized: true, required: true },
                      ],
                    },
                  ],
                },
                {
                  label: 'SEO',
                  fields: [
                    {
                      name: 'privacyMetaTitle',
                      label: 'Meta Title',
                      type: 'text',
                      localized: true,
                      required: true,
                      defaultValue: 'Privacy Policy | Parla',
                    },
                    {
                      name: 'privacyMetaDescription',
                      label: 'Meta Description',
                      type: 'textarea',
                      localized: true,
                      required: true,
                      defaultValue: 'Read the Parla privacy policy to understand how personal data is collected, used, and protected.',
                    },
                    {
                      name: 'privacyMetaImage',
                      label: 'Social Sharing Image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Cookie Policy',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Content',
                  fields: [
                    {
                      name: 'cookieTitle',
                      label: 'Title',
                      type: 'text',
                      localized: true,
                      required: true,
                      defaultValue: 'Cookie Policy',
                    },
                    {
                      name: 'cookieOverviewLabel',
                      label: 'Overview Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Overview',
                    },
                    {
                      name: 'cookieOverviewContent',
                      label: 'Overview Content',
                      type: 'richText',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'cookieDomainLabel',
                      label: 'Domain Label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'cookieDomain',
                      label: 'Domain',
                      type: 'text',
                      defaultValue: 'parla.com',
                    },
                    {
                      name: 'cookieConsentSectionLabel',
                      label: 'Consent Section Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Cookie Consent',
                    },
                    {
                      name: 'cookieCurrentStateLabel',
                      label: 'Current State Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Your current state:',
                    },
                    {
                      name: 'cookieConsentIdLabel',
                      label: 'Consent ID Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Your consent ID:',
                    },
                    {
                      name: 'cookieConsentDateLabel',
                      label: 'Consent Date Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Consent date:',
                    },
                    {
                      name: 'cookieNotDefinedLabel',
                      label: 'Not Defined Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Not defined yet',
                    },
                    {
                      name: 'cookieAcceptedLabel',
                      label: 'Accepted Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Accepted.',
                    },
                    {
                      name: 'cookieDeclinedLabel',
                      label: 'Declined Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Declined.',
                    },
                    {
                      name: 'cookieCustomLabel',
                      label: 'Custom Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Custom.',
                    },
                    {
                      name: 'cookieSettingsButtonLabel',
                      label: 'Settings Button Label',
                      type: 'text',
                      localized: true,
                      defaultValue: 'Cookie settings',
                    },
                  ],
                },
                {
                  label: 'SEO',
                  fields: [
                    {
                      name: 'cookieMetaTitle',
                      label: 'Meta Title',
                      type: 'text',
                      localized: true,
                      required: true,
                      defaultValue: 'Cookie Policy | Parla',
                    },
                    {
                      name: 'cookieMetaDescription',
                      label: 'Meta Description',
                      type: 'textarea',
                      localized: true,
                      required: true,
                      defaultValue: 'Read the Parla cookie policy and review your current cookie consent settings and preferences.',
                    },
                    {
                      name: 'cookieMetaImage',
                      label: 'Social Sharing Image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
