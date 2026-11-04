import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { PostCard } from '@/components/insights/post-card'
import { getPublicPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Artículos',
  description:
    'Artículos de Bill Gaize sobre producto, integraciones y escritura.',
  alternates: {
    canonical: '/insights'
  },
  openGraph: {
    title: 'Artículos | Bill Gaize',
    description:
      'Artículos de Bill Gaize sobre producto, integraciones y escritura.',
    url: `${siteConfig.url}/insights`,
    type: 'website'
  }
}

export default async function InsightsPage() {
  const posts = getPublicPosts()
  const lang =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'

  const copy =
    lang === 'en'
      ? {
          title: 'Articles',
          description:
            'Notes on product work, integrations, and writing.',
          back: 'Back to home'
        }
      : {
          title: 'Artículos',
          description:
            'Notas sobre producto, integraciones y escritura.',
          back: 'Volver al inicio'
        }

  return (
    <div className="space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
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
