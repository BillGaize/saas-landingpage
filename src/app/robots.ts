import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All standard crawlers (Google, Bing, etc.)
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api']
      },
      {
        // Explicitly welcome AI answer engines for AEO/GEO visibility.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot'
        ],
        allow: '/',
        disallow: ['/admin', '/api']
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  }
}
