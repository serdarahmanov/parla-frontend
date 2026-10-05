import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service Detail Page',
    plural: '01 — Service Detail Pages',
  },
  admin: {
    group: 'Services Page',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Used by the detail URL, for example: /service/marketing',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Controls the order on the Services catalog page.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Catalog Line',
          fields: [
            {
              name: 'catalogSummary',
              type: 'textarea',
              localized: true,
              required: true,
              admin: {
                description: 'Short description displayed on the Services catalog page.',
              },
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Detail Page',
          fields: [
            {
              name: 'detailDescription',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'offeringsHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Services',
            },
            {
              name: 'offerings',
              type: 'array',
              minRows: 1,
              admin: {
                description: 'Offerings belong only to this service detail page.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              name: 'processHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Process',
            },
            {
              name: 'process',
              type: 'array',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  required: true,
                },
              ],
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
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
