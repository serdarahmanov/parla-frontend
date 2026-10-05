import type { GlobalConfig } from 'payload'

export const HomeBrandStatement: GlobalConfig = {
  slug: 'home-brand-statement',
  label: '03 — Marketing Section',
  admin: { group: 'Home Page' },
  access: { read: () => true },
  fields: [
    {
      name: 'statement',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'WE BUILD BRANDS',
    },
    {
      name: 'marqueeText',
      label: 'Marquee Text',
      type: 'textarea',
      localized: true,
      required: true,
      defaultValue: 'Parla is a production and software studio. We combine established production expertise with new digital capabilities.',
      admin: {
        description: 'Scrolling text displayed along the bottom of the Marketing section.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Desktop Media',
          description: 'Media used on tablet, laptop, and desktop screens.',
          fields: [
            {
              name: 'desktopCoverImage',
              label: 'Desktop Cover Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Displayed until the desktop video is ready, or permanently when no desktop video is uploaded.',
              },
            },
            {
              name: 'desktopVideo',
              label: 'Desktop Video',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Mobile Media',
          description: 'Media used on screens narrower than 768px.',
          fields: [
            {
              name: 'mobileCoverImage',
              label: 'Mobile Cover Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Displayed until the mobile video is ready, or permanently when no mobile video is uploaded.',
              },
            },
            {
              name: 'mobileVideo',
              label: 'Mobile Video',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
