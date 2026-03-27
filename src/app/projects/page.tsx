import type { Metadata } from 'next'
import { portfolioProjects } from '@/lib/profile-data'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos seleccionados de Bill Gaize en Shopify, migraciones e integraciones logisticas B2B.',
  alternates: {
    canonical: '/projects'
  }
}

export default function ProjectsPage() {
  const lang =
    cookies().get('site-lang')?.value === 'en' ? 'en' : 'es'

  const copy =
    lang === 'en'
      ? {
          sectionLabel: 'Selected work',
          title: 'Highlighted Projects',
          description:
            'Real-world work across e-commerce, platform migrations, and delivery integrations, combining project leadership with product thinking.',
          roleLabel: 'Role:',
          scopeLabel: 'Scope:',
          visitProject: 'Visit project'
        }
      : {
          sectionLabel: 'Trabajo seleccionado',
          title: 'Proyectos destacados',
          description:
            'Casos reales en e-commerce, migraciones de plataforma e integraciones de delivery, combinando liderazgo de proyecto y enfoque de producto.',
          roleLabel: 'Rol:',
          scopeLabel: 'Alcance:',
          visitProject: 'Ver proyecto'
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
      </section>

      <section className="space-y-4">
        {portfolioProjects.map((project) => (
          <article
            key={project.slug}
            className="notion-card space-y-4"
          >
            <h2 className="text-4xl font-semibold tracking-tight">
              {project.title}
            </h2>
            <p className="text-lg leading-8 text-zinc-700">
              {project.summary}
            </p>
            <p className="text-base text-zinc-700">
              <span className="font-semibold">
                {copy.roleLabel}
              </span>{' '}
              {project.role}
            </p>
            <p className="text-base text-zinc-700">
              <span className="font-semibold">
                {copy.scopeLabel}
              </span>{' '}
              {project.scope}
            </p>
            <p
              className="rounded-xl border border-line bg-zinc-50 px-4 py-3 text-base
                text-zinc-700"
            >
              {project.impact}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={`${project.slug}-${tech}`}
                  className="rounded-lg border border-line bg-zinc-50 px-3 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-line px-4 py-2 text-sm
                  font-medium transition-colors hover:bg-zinc-50"
              >
                {copy.visitProject}
              </a>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  )
}
