import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getFeaturedPosts } from '@/lib/posts'
import {
  profileFacts,
  coreServices,
  selectedImpact
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
          eyebrow:
            'PRODUCT MANAGER · B2B PLATFORMS & API INTEGRATIONS',
          heading: 'Hi, I am Bill',
          roleLine: profileFacts.roleEn,
          intro: profileFacts.bioEn,
          viewProjects: 'View projects',
          contact: 'Contact me',
          help: 'How I can help',
          impactEyebrow: 'SELECTED IMPACT',
          impactTitle: 'Selected impact',
          impactDescription:
            'Defendable product and B2B integration results across international markets.',
          insightsTitle: 'Featured insights',
          allInsights: 'See all articles',
          locale: 'en-US'
        }
      : {
          eyebrow:
            'PRODUCT MANAGER · B2B PLATFORMS & API INTEGRATIONS',
          heading: 'Hola, soy Bill',
          roleLine: profileFacts.role,
          intro: profileFacts.bio,
          viewProjects: 'Ver proyectos',
          contact: 'Contactarme',
          help: 'En que te puedo ayudar',
          impactEyebrow: 'SELECTED IMPACT',
          impactTitle: 'Impacto seleccionado',
          impactDescription:
            'Resultados de producto e integraciones B2B en mercados internacionales.',
          insightsTitle: 'Insights destacados',
          allInsights: 'Ver todos los articulos',
          locale: 'es-CL'
        }

  return (
    <div className="space-y-14 pb-12 pt-6 sm:pt-10">
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          {copy.eyebrow}
        </p>
        <h1 className="section-title">{copy.heading}</h1>
        <p className="max-w-3xl text-lg font-medium tracking-tight text-zinc-900">
          {copy.roleLine}
        </p>
        <p className="body-lg max-w-3xl">{copy.intro}</p>
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

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.22em] text-subtle">
            {copy.impactEyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            {copy.impactTitle}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-700">
            {copy.impactDescription}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {selectedImpact.map((item) => (
            <article
              key={item.stat}
              className="rounded-2xl border border-line bg-zinc-50 p-5"
            >
              <p className="text-3xl font-semibold tracking-tight">
                {item.stat}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                {lang === 'en' ? item.labelEn : item.label}
              </p>
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
