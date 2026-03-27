import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { PostCard } from '@/components/insights/post-card'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Articulos sobre Shopify, integraciones, desarrollo web y flujos de trabajo con IA escritos por Bill Gaize.',
  alternates: {
    canonical: '/insights'
  },
  openGraph: {
    title: 'Insights | Bill Gaize',
    description:
      'Articulos sobre Shopify, integraciones, desarrollo web y flujos de trabajo con IA escritos por Bill Gaize.',
    url: `${siteConfig.url}/insights`,
    type: 'website'
  }
}

export default function InsightsPage() {
  const posts = getAllPosts()
  const lang =
    cookies().get('site-lang')?.value === 'en' ? 'en' : 'es'

  const copy =
    lang === 'en'
      ? {
          sectionLabel: 'Blog',
          title: 'Insights',
          description:
            'Long-form articles on modern web development, integrations, and practical AI workflows.',
          back: 'Back to home'
        }
      : {
          sectionLabel: 'Blog',
          title: 'Insights',
          description:
            'Articulos largos sobre desarrollo web moderno, integraciones y flujos practicos con IA.',
          back: 'Volver al inicio'
        }

  return (
    <div className="space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          {copy.sectionLabel}
        </p>
        <h1 className="section-title">{copy.title}</h1>
        <p className="body-lg max-w-3xl">
          {copy.description}
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-subtle underline"
        >
          {copy.back}
        </Link>
      </section>

      <section className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            language={lang}
          />
        ))}
      </section>
    </div>
  )
}
