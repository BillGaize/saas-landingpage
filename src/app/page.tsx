import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import {
  profileFacts,
  coreServices
} from '@/lib/profile-data'

export const metadata: Metadata = {
  alternates: {
    canonical: '/'
  }
}

export default function Home() {
  const featuredPosts = getFeaturedPosts()

  return (
    <div className="space-y-14 pb-12 pt-6 sm:pt-10">
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Full Stack Portfolio
        </p>
        <h1 className="section-title">Hello there 👋</h1>
        <p className="body-lg max-w-3xl">
          I am {profileFacts.name}, a {profileFacts.role}. I
          design and ship clean digital products, API
          integrations, and AI-assisted workflows with a
          process-first mindset shaped by medical science.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="rounded-xl bg-black px-5 py-3 text-base font-medium
              text-white"
          >
            View projects
          </Link>
          <a
            href={profileFacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-line px-5 py-3 text-base
              font-medium"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profileFacts.contactEmail}`}
            className="rounded-xl border border-line px-5 py-3 text-base
              font-medium"
          >
            Contact me
          </a>
        </div>
      </section>

      <section className="notion-card space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight">
          What I can build with you
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {coreServices.map((service) => (
            <li
              key={service}
              className="rounded-xl border border-line bg-zinc-50 px-4 py-3 text-base
                text-zinc-700"
            >
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight">
            Featured insights
          </h2>
          <Link
            href="/insights"
            className="text-sm text-subtle underline"
          >
            View all posts
          </Link>
        </div>

        <div className="space-y-4">
          {featuredPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="block rounded-2xl border border-line bg-white px-5 py-4
                transition-colors hover:bg-zinc-50"
            >
              <p className="text-sm text-subtle">
                {new Date(
                  post.publishedAt
                ).toLocaleDateString('es-CL', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                {post.title}
              </h3>
              <p className="mt-1 text-base text-zinc-700">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
