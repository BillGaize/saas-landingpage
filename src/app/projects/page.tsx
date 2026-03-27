import type { Metadata } from 'next'
import { portfolioProjects } from '@/lib/profile-data'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos seleccionados de Bill Gaize en desarrollo full stack, integraciones y flujos asistidos por IA.',
  alternates: {
    canonical: '/projects'
  }
}

export default function ProjectsPage() {
  return (
    <div className="space-y-10 pb-14 pt-6 sm:pt-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-subtle">
          Trabajo seleccionado
        </p>
        <h1 className="section-title">
          Proyectos de desarrollo
        </h1>
        <p className="body-lg max-w-3xl">
          Productos practicos enfocados en resultados
          medibles, implementacion limpia y mantenibilidad
          a largo plazo.
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
          </article>
        ))}
      </section>
    </div>
  )
}
