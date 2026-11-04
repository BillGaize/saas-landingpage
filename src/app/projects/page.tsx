import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import {
  experience,
  portfolioProjects
} from '@/lib/profile-data'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos de Bill Gaize: app de Shopify para Yango B2B Cargo, HoyCerca, herramientas de onboarding de partners y un harness interno de producto.',
  alternates: {
    canonical: '/projects'
  }
}

export default async function ProjectsPage() {
  const lang =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'

  const copy =
    lang === 'en'
      ? {
          title: 'Projects',
          description:
            'Work I can point to: a Shopify app, HoyCerca, partner onboarding tools, and an internal product harness.',
          experienceTitle: 'Experience',
          visit: 'Visit'
        }
      : {
          title: 'Proyectos',
          description:
            'Trabajo que puedo mostrar: una app de Shopify, HoyCerca, herramientas de onboarding de partners y un harness interno de producto.',
          experienceTitle: 'Experiencia',
          visit: 'Visitar'
        }

  return (
    <div className="space-y-14 pb-14 pt-6 sm:pt-10">
      <section className="max-w-3xl space-y-4">
        <h1 className="section-title">{copy.title}</h1>
        <p className="body-lg max-w-3xl">
          {copy.description}
        </p>
      </section>

      <section className="max-w-3xl space-y-6">
        <h2 className="text-3xl">{copy.experienceTitle}</h2>
        <ol className="space-y-5">
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
              <p>{item.org}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl">
        <ol className="space-y-8">
          {portfolioProjects.map((project) => (
            <li
              key={project.slug}
              className="border-t border-line pt-5"
            >
              <h2 className="text-3xl">
                {lang === 'en'
                  ? project.titleEn
                  : project.title}
              </h2>
              <p className="mt-3 text-lg leading-8 text-zinc-800">
                {lang === 'en'
                  ? project.summaryEn
                  : project.summary}
              </p>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-clay underline"
                >
                  {copy.visit}
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
