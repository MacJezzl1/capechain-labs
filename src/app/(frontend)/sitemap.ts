import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return [
    '',
    '/about',
    '/services',
    '/projects',
    '/technology',
    '/contact',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
