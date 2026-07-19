import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/services/ai-app-rescue`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    {
      url: `${siteConfig.url}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2
    }
  ]

  const postEntries: MetadataRoute.Sitemap =
    getAllPosts().map((post) => ({
      url: `${siteConfig.url}/insights/${post.slug}`,
      lastModified: new Date(
        post.updatedAt ?? post.publishedAt
      ),
      changeFrequency: 'monthly',
      priority: 0.6
    }))

  return [...staticEntries, ...postEntries]
}
