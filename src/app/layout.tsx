import type { Metadata } from 'next'
import { Newsreader, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/site/site-shell'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteConfig, seoKeywords } from '@/lib/site'
import { StructuredData } from '@/components/seo/structured-data'
import { PostHogProvider } from '@/components/analytics/posthog-provider'

const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
})

const headingFont = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading'
})

const TITLE_DEFAULT =
  'Bill Gaize | Product manager de integraciones B2B | Santiago, Chile'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE_DEFAULT,
    template: '%s | Bill Gaize'
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  authors: [{ name: 'Bill Gaize', url: siteConfig.url }],
  creator: 'Bill Gaize',
  publisher: 'Bill Gaize',
  applicationName: 'Bill Gaize',
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'es-CL': '/',
      'es-419': '/',
      'en-US': '/?lang=en',
      'x-default': '/'
    }
  },
  openGraph: {
    type: 'profile',
    url: siteConfig.url,
    title: TITLE_DEFAULT,
    description: siteConfig.description,
    siteName: 'Bill Gaize',
    locale: 'es_CL',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Bill Gaize, product manager de integraciones B2B, Santiago, Chile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE_DEFAULT,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  other: {
    'geo.region': siteConfig.geo.region,
    'geo.placename': siteConfig.geo.placename,
    'geo.position': `${siteConfig.geo.lat};${siteConfig.geo.lng}`,
    ICBM: `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable} antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="font-sans">
        <PostHogProvider>
          <Analytics />
          <SpeedInsights />
          <SiteShell>{children}</SiteShell>
        </PostHogProvider>
      </body>
    </html>
  )
}
