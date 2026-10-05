import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import nodemailer from 'nodemailer'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './src/collections/Media'
import { Services } from './src/collections/Services'
import { Users } from './src/collections/Users'
import { AboutCapabilities } from './src/globals/AboutCapabilities'
import { AboutContact } from './src/globals/AboutContact'
import { AboutIntro } from './src/globals/AboutIntro'
import { Footer } from './src/globals/Footer'
import { HomeBrandStatement } from './src/globals/HomeBrandStatement'
import { HomeHero } from './src/globals/HomeHero'
import { HomeProcess } from './src/globals/HomeProcess'
import { HomeProduction } from './src/globals/HomeProduction'
import { HomeServices } from './src/globals/HomeServices'
import { Navigation } from './src/globals/Navigation'
import { Privacy } from './src/globals/Privacy'
import { ServicesHeader } from './src/globals/ServicesHeader'
import { SiteSettings } from './src/globals/SiteSettings'

const isProduction = process.env.NODE_ENV === 'production'

if (isProduction && !process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET must be set in production')
}

if (isProduction && !process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI must be set in production')
}

const gmailUser = process.env.GMAIL_USER
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Services],
  globals: [
    SiteSettings,
    Navigation,
    Footer,
    HomeHero,
    HomeProduction,
    HomeBrandStatement,
    HomeServices,
    HomeProcess,
    ServicesHeader,
    AboutIntro,
    AboutCapabilities,
    AboutContact,
    Privacy,
  ],
  localization: {
    locales: [
      { label: 'Turkmen', code: 'tk' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'tk',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ??
        'postgresql://postgres:postgres@127.0.0.1:5432/parla',
    },
    push: !isProduction,
  }),
  editor: lexicalEditor(),
  email:
    gmailUser && gmailAppPassword
      ? nodemailerAdapter({
          defaultFromAddress: process.env.NOREPLY_EMAIL ?? gmailUser,
          defaultFromName: 'Parla',
          transport: nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: gmailUser,
              pass: gmailAppPassword,
            },
          }),
        })
      : undefined,
  plugins: [
    importExportPlugin({
      collections: [
        { slug: 'services' },
        { slug: 'media', import: false },
      ],
    }),
  ],
  secret:
    process.env.PAYLOAD_SECRET ??
    'parla-local-development-secret-change-before-production',
  sharp,
  typescript: {
    outputFile: './payload-types.ts',
  },
})
