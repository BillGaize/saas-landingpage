import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getFeaturedPosts } from '@/lib/posts'
import {
  profileFacts,
  coreServices,
  experience,
  impactCopy,
  portfolioProjects
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
          hero: `${profileFacts.roleEn}. ${profileFacts.bioEn}`,
          viewProjects: 'View projects',
          contact: 'Email me',
          help: 'How I can help',
          workTitle: 'Recent work',
          workBody: impactCopy.en,
          experienceTitle: 'Experience',
          projectsTitle: 'Projects',
          insightsTitle: 'Articles',
          allInsights: 'All articles',
          visit: 'Visit',
          locale: 'en-US'
        }
      : {
          hero: `${profileFacts.role}. ${profileFacts.bio}`,
          viewProjects: 'Ver proyectos',
          contact: 'Escríbeme',
          help: '¿En qué te puedo ayudar?',
          workTitle: 'Trabajo reciente',
          workBody: impactCopy.es,
          experienceTitle: 'Experiencia',
          projectsTitle: 'Proyectos',
          insightsTitle: 'Artículos',
          allInsights: 'Ver todos los artículos',
          visit: 'Visitar',
          locale: 'es-CL'
        }

  return (
    <div className="space-y-16 pb-12 pt-6 sm:pt-10">
      <section className="space-y-8">
        <h1 className="max-w-3xl text-3xl leading-snug sm:text-4xl">
          {copy.hero}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="bg-black px-5 py-3 text-base text-white"
          >
            {copy.viewProjects}
          </Link>
          <a
            href={profileFacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-5 py-3 text-base"
          >
            LinkedIn
          </a>
          <a
            data-attr="home-email"
            href={`mailto:${profileFacts.contactEmail}`}
            className="border border-line px-5 py-3 text-base"
          >
            {copy.contact}
          </a>
        </div>
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-3xl">{copy.help}</h2>
        <ul className="space-y-2 text-lg leading-8 text-zinc-800">
          {coreServices.map((service) => (
            <li key={service.es}>
              {lang === 'en' ? service.en : service.es}
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-3xl">{copy.workTitle}</h2>
        <p className="text-lg leading-8 text-zinc-800">
          {copy.workBody}
        </p>
      </section>

      <section className="max-w-3xl space-y-6">
        <h2 className="text-3xl">{copy.experienceTitle}</h2>
        <ol className="space-y-6">
          {experience.map((item) => (
            <li
              key={`${item.org}-${item.dates}`}
              className="border-t border-line pt-4"
            >
              <p className="text-sm text-subtle">
                {lang === 'en' ? item.datesEn : item.dates}
              </p>
              <h3 className="mt-1 text-2xl">
                {lang === 'en' ? item.roleEn : item.role}
              </h3>
              <p className="text-base text-zinc-800">
                {item.org}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl space-y-6">
        <h2 className="text-3xl">{copy.projectsTitle}</h2>
        <ol className="space-y-6">
          {portfolioProjects.map((project) => (
            <li
              key={project.slug}
              className="border-t border-line pt-4"
            >
              <h3 className="text-2xl">
                {lang === 'en'
                  ? project.titleEn
                  : project.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-zinc-800">
                {lang === 'en'
                  ? project.summaryEn
                  : project.summary}
              </p>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-clay underline"
                >
                  {copy.visit}
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">{copy.insightsTitle}</h2>
          <Link
            href="/insights"
            className="text-sm text-clay underline"
          >
            {copy.allInsights}
          </Link>
        </div>
        <div>
          {featuredPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="block border-t border-line py-4"
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
              <h3 className="mt-1 text-2xl">
                {post.title}
              </h3>
              <p className="mt-1 text-base text-zinc-800">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
