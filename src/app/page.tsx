import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getFeaturedPosts } from '@/lib/posts'
import {
  profileFacts,
  coreServices,
  linkedinFeedItems
} from '@/lib/profile-data'

export const metadata: Metadata = {
  alternates: {
    canonical: '/'
  }
}

export default async function Home() {
  const featuredPosts = getFeaturedPosts()
  const lang =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'

  const copy =
    lang === 'en'
      ? {
          portfolio: 'Technology Portfolio',
          heading: 'Hi, I am Bill 👋',
          intro:
            'I am {name}, {role}. I lead digital products, API integrations, and AI-assisted workflows with a process-first mindset grounded in applied science.',
          viewProjects: 'View projects',
          contact: 'Contact me',
          help: 'How I can help',
          linkedinTitle: 'LinkedIn activity',
          linkedinDescription:
            'A curated preview of the themes I publish and discuss on LinkedIn. Open my profile for the live feed.',
          openLinkedin: 'Open live LinkedIn feed',
          linkedinLiveLabel: 'Curated from LinkedIn topics',
          insightsTitle: 'Featured insights',
          allInsights: 'See all articles',
          locale: 'en-US'
        }
      : {
          portfolio: 'Portafolio de tecnologia',
          heading: 'Hola, soy Bill 👋',
          intro:
            'Soy {name}, {role}. Lidero productos digitales, integraciones API y flujos asistidos por IA con un enfoque de proceso basado en ciencia aplicada.',
          viewProjects: 'Ver proyectos',
          contact: 'Contactarme',
          help: 'En que te puedo ayudar',
          linkedinTitle: 'Actividad en LinkedIn',
          linkedinDescription:
            'Una vista curada de los temas que publico y converso en LinkedIn. Abre mi perfil para ver el feed en vivo.',
          openLinkedin: 'Abrir feed en LinkedIn',
          linkedinLiveLabel:
            'Curado desde temas de LinkedIn',
          insightsTitle: 'Insights destacados',
          allInsights: 'Ver todos los articulos',
          locale: 'es-CL'
        }

  const introText = copy.intro
    .replace('{name}', profileFacts.name)
    .replace('{role}', profileFacts.role)

  return (
    <div className="space-y-14 pb-12 pt-6 sm:pt-10">
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          {copy.portfolio}
        </p>
        <h1 className="section-title">{copy.heading}</h1>
        <p className="body-lg max-w-3xl">{introText}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="rounded-xl bg-black px-5 py-3 text-base font-medium
              text-white"
          >
            {copy.viewProjects}
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
            {copy.contact}
          </a>
        </div>
      </section>

      <section className="notion-card space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight">
          {copy.help}
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

      <section className="notion-card space-y-6">
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-end
            sm:justify-between"
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.22em] text-subtle">
              LinkedIn
            </p>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight">
                {copy.linkedinTitle}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-700">
                {copy.linkedinDescription}
              </p>
            </div>
          </div>
          <a
            href={`${profileFacts.linkedin}recent-activity/all/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl
              bg-[#0a66c2] px-5 py-3 text-base font-medium text-white
              transition-colors hover:bg-[#004182]"
          >
            {copy.openLinkedin}
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {linkedinFeedItems.map((item) => (
            <article
              key={item.title}
              className="flex min-h-[260px] flex-col justify-between rounded-2xl
                border border-line bg-zinc-50 p-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg
                      bg-[#0a66c2] text-lg font-bold text-white"
                  >
                    in
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-subtle">
                    {copy.linkedinLiveLabel}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#0a66c2]">
                    {item.eyebrow}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-base leading-7 text-zinc-700">
                    {item.body}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs
                      font-medium text-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight">
            {copy.insightsTitle}
          </h2>
          <Link
            href="/insights"
            className="text-sm text-subtle underline"
          >
            {copy.allInsights}
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
                ).toLocaleDateString(copy.locale, {
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
