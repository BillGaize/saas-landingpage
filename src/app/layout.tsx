import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/site/site-shell'
import { Analytics } from '@vercel/analytics/react'
import { siteConfig } from '@/lib/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Bill Gaize | Full Stack Portfolio',
    template: '%s | Bill Gaize'
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: 'Bill Gaize | Full Stack Portfolio',
    description: siteConfig.description,
    siteName: 'Bill Gaize',
    images: '/opengraph-image.png'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bill Gaize | Full Stack Portfolio',
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="antialiased"
    >
      <body className={inter.className}>
        <Analytics />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
