import path from 'path'
import { buildConfig } from 'payload'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Services } from './collections/Services'
import { Technologies } from './collections/Technologies'
import { Projects } from './collections/Projects'
import { Inquiries } from './collections/Inquiries'
import { AuditLogs } from './collections/AuditLogs'
import { Company } from './globals/Company'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en: adminLanguage },
  },
  collections: [
    Admins,
    Media,
    Folders,
    Tags,
    Services,
    Technologies,
    Projects,
    Inquiries,
    AuditLogs,
  ],
  globals: [Company],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  secret: process.env.PAYLOAD_SECRET || 'capechain-labs-secret-key-32-chars-min',
})
