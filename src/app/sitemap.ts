import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/projects',
    '/insights',
    '/contact',
    '/privacy-policy',
    '/terms-of-service'
  ]

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }))

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug}`,
    lastModified: new Date(
      post.updatedAt ?? post.publishedAt
    )
  }))

  return [...staticEntries, ...postEntries]
}
