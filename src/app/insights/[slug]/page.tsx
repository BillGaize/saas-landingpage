import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

interface PostPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }))
}

export function generateMetadata({
  params
}: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    alternates: {
      canonical: `/insights/${post.slug}`
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/insights/${post.slug}`,
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description
    }
  }
}

export default function PostPage({
  params
}: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription ?? post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Bill Gaize'
    },
    publisher: {
      '@type': 'Person',
      name: 'Bill Gaize'
    },
    mainEntityOfPage: `${siteConfig.url}/insights/${post.slug}`,
    articleSection: post.category
  }

  return (
    <article className="space-y-10 pb-16 pt-6 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />

      <header className="space-y-5">
        <Link
          href="/insights"
          className="inline-block text-sm text-subtle underline"
        >
          Volver a insights
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm text-subtle">
          <span>
            {new Date(post.publishedAt).toLocaleDateString(
              'es-CL'
            )}
          </span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          {post.title}
        </h1>
        <p className="body-lg max-w-3xl">
          {post.description}
        </p>
      </header>

      <div
        className="rounded-2xl border border-line bg-zinc-50 px-6 py-5 text-lg
          leading-8 text-zinc-700"
      >
        {post.hero}
      </div>

      <div className="post-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.body}
        </ReactMarkdown>
      </div>

      <div className="notion-card space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Quieres construir algo similar?
        </h2>
        <p className="text-base leading-8 text-zinc-700">
          Si este estilo de contenido o workflow encaja con
          tu equipo, podemos disenar una solucion alineada a
          tu stack y objetivos.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:me@billgaize.com"
            className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium
              text-white"
          >
            Escribeme
          </a>
          <a
            href="https://calendly.com/me--52uo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-line px-4 py-2.5 text-sm
              font-medium"
          >
            Agendar llamada
          </a>
        </div>
      </div>
    </article>
  )
}
