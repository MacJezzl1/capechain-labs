export type MakeSiteSettings = {
  title?: string
  description?: string
  language?: string
  robots?: {
    index?: boolean
  }
  icons?: {
    icon?: string
  }
  openGraph?: {
    image?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  customScripts?: {
    headStart?: string
    headEnd?: string
    bodyStart?: string
    bodyEnd?: string
  }
  accessibility?: {
    addBypassLinks?: boolean
  }
}

export const makeSiteSettings: MakeSiteSettings = {
  title: 'CapeChain Labs | Intelligent Digital Infrastructure',
  description:
    'CapeChain Labs engineers intelligent software, AI systems, blockchain infrastructure and future-ready digital products.',
  language: 'en',
  icons: {
    icon: '/capechain-logo.png',
  },
}

export function sanitizeHtmlAttribute(value: string | undefined): string {
  return value?.replace(/[^a-zA-Z0-9_-]/g, '') || ''
}
