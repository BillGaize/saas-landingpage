import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  ShieldCheck,
  Wrench
} from 'lucide-react'
import { profileFacts } from '@/lib/profile-data'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title:
    'AI App Rescue | Fix Lovable, Bolt, v0 and Next.js apps',
  description:
    'Rescue AI-built web apps that work in a demo but fail in production. Next.js, Lovable, Bolt, v0, Replit, auth, database, payments and deployment fixes by Bill Gaize.',
  alternates: {
    canonical: '/services/ai-app-rescue'
  },
  openGraph: {
    title:
      'AI App Rescue — From AI demo to stable production',
    description:
      'A focused rescue service for Next.js, Lovable, Bolt, v0 and Replit apps with broken auth, databases, payments or deployments.',
    url: `${siteConfig.url}/services/ai-app-rescue`,
    type: 'website'
  }
}

const copy = {
  es: {
    eyebrow: 'AI App Rescue · remoto desde Chile',
    title: 'De demo con IA a producción estable.',
    subtitle:
      'Rescato aplicaciones creadas con Lovable, Bolt, v0, Replit, Cursor o Next.js cuando el demo funciona, pero auth, base de datos, pagos o deploy fallan en producción.',
    primaryCta: 'Solicitar diagnóstico por US$79',
    secondaryCta: 'Agendar 30 minutos',
    tools:
      'Next.js · Lovable · Bolt · v0 · Replit · Cursor',
    signalsTitle: '¿Tu aplicación está atrapada aquí?',
    signals: [
      'El login funciona localmente, pero falla después del deploy.',
      'Stripe, webhooks o emails no llegan de forma confiable.',
      'Supabase, Prisma o la base de datos pierden datos o permisos.',
      'Cada arreglo generado por IA rompe otra parte del producto.',
      'Vercel compila, pero la app devuelve errores en producción.',
      'Necesitas lanzar sin reescribir el proyecto desde cero.'
    ],
    outcomeTitle:
      'La entrega no es otra conversación con un chatbot.',
    outcomeBody:
      'Recibes un repositorio verificable: causa raíz documentada, cambios en Git, build y pruebas ejecutadas, checklist de producción y un walkthrough para que puedas seguir operándolo.',
    outcomes: [
      'PR o commits revisables',
      'Build y validaciones ejecutadas',
      'Variables y deploy documentados',
      'Walkthrough de entrega'
    ],
    pricingEyebrow: 'Alcance y precio',
    pricingTitle:
      'Empieza pequeño. Escala sólo si tiene sentido.',
    pricingNote:
      'Los precios cubren un repositorio y un entorno. Si el diagnóstico revela una reconstrucción mayor, recibirás opciones antes de autorizar trabajo adicional.',
    plans: [
      {
        name: 'Diagnóstico',
        price: 'US$79',
        timing: 'en 24 horas hábiles',
        description:
          'Para saber qué falla, por qué y cuánto cuesta resolverlo.',
        features: [
          'Revisión de código y deploy',
          'Causa raíz priorizada',
          'Plan de corrección con alcance',
          'Cotización fija del siguiente paso'
        ],
        cta: 'Diagnosticar mi app',
        subject: 'AI App Rescue — Diagnóstico US$79'
      },
      {
        name: 'Rescate enfocado',
        price: 'US$249',
        timing: 'objetivo: 48 horas',
        description:
          'Para un fallo acotado de auth, datos, pagos, API o deploy.',
        features: [
          'Todo el diagnóstico',
          'Corrección implementada',
          'Build y smoke tests',
          'Deploy o instrucciones exactas'
        ],
        cta: 'Solicitar rescate',
        subject: 'AI App Rescue — Rescate enfocado US$249',
        featured: true
      },
      {
        name: 'Sprint de producción',
        price: 'desde US$599',
        timing: '3–5 días hábiles',
        description:
          'Para varios bloqueos conectados o una estabilización de lanzamiento.',
        features: [
          'Auditoría técnica priorizada',
          'Múltiples correcciones acordadas',
          'Hardening y validación',
          'Handoff técnico grabado'
        ],
        cta: 'Evaluar mi sprint',
        subject: 'AI App Rescue — Sprint de producción'
      }
    ],
    processTitle: 'Un proceso corto y comprobable',
    process: [
      [
        '1. Acceso mínimo',
        'Repositorio, URL y errores visibles. Nunca envíes secretos por email.'
      ],
      [
        '2. Reproducción',
        'Reproduzco el fallo y delimito la causa antes de cambiar código.'
      ],
      [
        '3. Corrección',
        'Trabajo en una rama y valido build, tests y flujo crítico.'
      ],
      [
        '4. Entrega',
        'Recibes cambios, evidencia, checklist y walkthrough.'
      ]
    ],
    proofEyebrow: 'Evidencia relevante',
    proofTitle: 'Producto, integraciones y operación real',
    proof: [
      {
        title: 'HoyCerca',
        body: 'Aplicación PWA map-first operada en Oracle Cloud, con Google OAuth, perfiles, moderación, analítica y flujos de publicación.',
        href: 'https://hoycerca.billgaize.com',
        link: 'Ver producto activo'
      },
      {
        title: 'Integraciones B2B multi-país',
        body: 'Liderazgo de integraciones API y operaciones de delivery en seis mercados, coordinando producto, partners y ejecución técnica.',
        href: '/projects/yango-b2b-integrations',
        link: 'Ver caso de proyecto'
      }
    ],
    fitTitle: 'Buen encaje si…',
    fit: [
      'Ya tienes un repositorio y un demo o deploy.',
      'Puedes describir un resultado observable que está fallando.',
      'Aceptas acceso por invitación y cambios trazables en Git.',
      'Quieres estabilizar antes de añadir más funcionalidades.'
    ],
    notFitTitle: 'No es el servicio correcto si…',
    notFit: [
      'Sólo tienes una idea y necesitas diseñar todo el producto.',
      'Buscas clonar un producto sin autorización.',
      'No puedes compartir código ni un entorno reproducible.',
      'El trabajo requiere manipular credenciales por mensajes.'
    ],
    finalTitle:
      'Mándame el enlace y el error. Yo hago el resto.',
    finalBody:
      'El email ya incluye las preguntas mínimas. Respondo normalmente dentro de 24 horas hábiles y no pido acceso hasta confirmar el encaje.',
    finalCta: 'Abrir solicitud preparada',
    bookCta: 'O agendar llamada',
    footerNote:
      'Disponible para equipos globales · Español e inglés'
  },
  en: {
    eyebrow: 'AI App Rescue · remote from Chile',
    title: 'From AI demo to stable production.',
    subtitle:
      'I rescue apps built with Lovable, Bolt, v0, Replit, Cursor or Next.js when the demo works but auth, databases, payments or deployment fail in production.',
    primaryCta: 'Request a US$79 diagnosis',
    secondaryCta: 'Book 30 minutes',
    tools:
      'Next.js · Lovable · Bolt · v0 · Replit · Cursor',
    signalsTitle: 'Is your app stuck here?',
    signals: [
      'Login works locally but fails after deployment.',
      'Stripe, webhooks or emails are not reliable.',
      'Supabase, Prisma or the database loses data or permissions.',
      'Every AI-generated fix breaks another part of the product.',
      'Vercel builds, but the app returns production errors.',
      'You need to launch without rewriting the project from scratch.'
    ],
    outcomeTitle:
      'The deliverable is not another chatbot conversation.',
    outcomeBody:
      'You get a verifiable repository: documented root cause, Git changes, executed build and checks, a production checklist and a walkthrough so you can keep operating it.',
    outcomes: [
      'Reviewable PR or commits',
      'Build and checks executed',
      'Environment and deploy documented',
      'Delivery walkthrough'
    ],
    pricingEyebrow: 'Scope and pricing',
    pricingTitle:
      'Start small. Scale only when it makes sense.',
    pricingNote:
      'Prices cover one repository and one environment. If the diagnosis reveals a larger rebuild, you receive options before authorizing additional work.',
    plans: [
      {
        name: 'Diagnosis',
        price: 'US$79',
        timing: 'within 1 business day',
        description:
          'Find what is failing, why, and what it will take to fix.',
        features: [
          'Code and deployment review',
          'Prioritized root cause',
          'Scoped remediation plan',
          'Fixed-price next step'
        ],
        cta: 'Diagnose my app',
        subject: 'AI App Rescue — US$79 diagnosis'
      },
      {
        name: 'Focused rescue',
        price: 'US$249',
        timing: 'target: 48 hours',
        description:
          'For one bounded auth, data, payment, API or deploy failure.',
        features: [
          'Everything in diagnosis',
          'Fix implemented',
          'Build and smoke tests',
          'Deployment or exact instructions'
        ],
        cta: 'Request a rescue',
        subject: 'AI App Rescue — US$249 focused rescue',
        featured: true
      },
      {
        name: 'Production sprint',
        price: 'from US$599',
        timing: '3–5 business days',
        description:
          'For connected blockers or a launch-stabilization pass.',
        features: [
          'Prioritized technical audit',
          'Multiple agreed fixes',
          'Hardening and validation',
          'Recorded technical handoff'
        ],
        cta: 'Assess my sprint',
        subject: 'AI App Rescue — production sprint'
      }
    ],
    processTitle: 'A short, verifiable process',
    process: [
      [
        '1. Minimum access',
        'Repository, URL and visible errors. Never send secrets by email.'
      ],
      [
        '2. Reproduction',
        'I reproduce and bound the root cause before changing code.'
      ],
      [
        '3. Repair',
        'I work on a branch and validate the build, tests and critical flow.'
      ],
      [
        '4. Handoff',
        'You receive changes, evidence, a checklist and walkthrough.'
      ]
    ],
    proofEyebrow: 'Relevant evidence',
    proofTitle:
      'Real product, integration and operations work',
    proof: [
      {
        title: 'HoyCerca',
        body: 'A map-first PWA operated on Oracle Cloud with Google OAuth, profiles, moderation, analytics and publishing workflows.',
        href: 'https://hoycerca.billgaize.com',
        link: 'View live product'
      },
      {
        title: 'Multi-country B2B integrations',
        body: 'Led delivery API integrations and operations across six markets, coordinating product, partners and technical execution.',
        href: '/projects/yango-b2b-integrations',
        link: 'View project case'
      }
    ],
    fitTitle: 'A good fit if…',
    fit: [
      'You already have a repository and a demo or deployment.',
      'You can describe an observable outcome that is failing.',
      'You accept invite-based access and traceable Git changes.',
      'You want to stabilize before adding more features.'
    ],
    notFitTitle: 'Not the right service if…',
    notFit: [
      'You only have an idea and need the whole product designed.',
      'You want to clone a product without authorization.',
      'You cannot share code or a reproducible environment.',
      'The work requires sending credentials in messages.'
    ],
    finalTitle:
      'Send the link and the error. I will handle the rest.',
    finalBody:
      'The email already includes the minimum questions. I normally reply within one business day and do not request access until fit is confirmed.',
    finalCta: 'Open prepared request',
    bookCta: 'Or book a call',
    footerNote:
      'Available for global teams · English and Spanish'
  }
} as const

function createMailto(
  subject: string,
  language: 'es' | 'en'
) {
  const body =
    language === 'es'
      ? `Hola Bill,\n\nQuiero evaluar un AI App Rescue.\n\n1. URL del demo o deploy:\n2. Repositorio/plataforma (no envíes acceso todavía):\n3. ¿Qué debería ocurrir?\n4. ¿Qué ocurre en realidad?\n5. ¿Hay una fecha límite?\n\nGracias.`
      : `Hi Bill,\n\nI would like to assess an AI App Rescue.\n\n1. Demo or deployment URL:\n2. Repository/platform (do not send access yet):\n3. What should happen?\n4. What happens instead?\n5. Is there a deadline?\n\nThanks.`

  return `mailto:${profileFacts.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default async function AiAppRescuePage() {
  const language =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'
  const text = copy[language]
  const primaryMailto = createMailto(
    text.plans[0].subject,
    language
  )

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI App Rescue',
    description: text.subtitle,
    provider: {
      '@type': 'Person',
      name: profileFacts.name,
      url: siteConfig.url
    },
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Spanish'],
    url: `${siteConfig.url}/services/ai-app-rescue`,
    offers: text.plans.map((plan, index) => ({
      '@type': 'Offer',
      name: plan.name,
      priceCurrency: 'USD',
      price:
        index === 0 ? '79' : index === 1 ? '249' : '599',
      description: plan.description,
      url: `${siteConfig.url}/services/ai-app-rescue`
    }))
  }

  return (
    <div className="pb-16 pt-2 sm:pt-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />

      <section
        className="relative overflow-hidden border-b border-line pb-14 pt-6
          sm:pb-20 sm:pt-10"
      >
        <div
          className="absolute -right-20 top-0 -z-10 h-64 w-64 rounded-full
            bg-emerald-200/50 blur-3xl"
        />
        <p
          className="text-sm font-medium uppercase tracking-[0.22em]
            text-emerald-700"
        >
          {text.eyebrow}
        </p>
        <h1
          className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em]
            sm:text-7xl"
        >
          {text.title}
        </h1>
        <p
          className="mt-6 max-w-3xl text-xl leading-9 text-zinc-700 sm:text-2xl
            sm:leading-10"
        >
          {text.subtitle}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={primaryMailto}
            className="inline-flex items-center justify-center gap-2 rounded-xl
              bg-black px-5 py-3.5 text-base font-medium text-white
              transition-transform hover:-translate-y-0.5"
          >
            {text.primaryCta}
            <ArrowRight size={18} />
          </a>
          <a
            href={profileFacts.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl
              border border-line bg-white px-5 py-3.5 text-base
              font-medium"
          >
            <Clock3 size={18} />
            {text.secondaryCta}
          </a>
        </div>
        <p className="mt-6 font-mono text-sm text-zinc-500">
          {text.tools}
        </p>
      </section>

      <section
        className="grid gap-10 border-b border-line py-14
          lg:grid-cols-[0.8fr_1.2fr]"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {text.signalsTitle}
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {text.signals.map((signal) => (
            <li
              key={signal}
              className="flex gap-3 py-4 text-lg leading-7 text-zinc-700"
            >
              <Wrench
                className="mt-1 shrink-0 text-emerald-700"
                size={18}
              />
              {signal}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-line py-14">
        <div className="rounded-[2rem] bg-zinc-950 px-6 py-10 text-white sm:px-10">
          <Code2 className="text-emerald-300" size={32} />
          <h2
            className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight
              sm:text-4xl"
          >
            {text.outcomeTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            {text.outcomeBody}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {text.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-center gap-3 text-base"
              >
                <CheckCircle2
                  className="shrink-0 text-emerald-300"
                  size={20}
                />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line py-14">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-subtle">
          {text.pricingEyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
          {text.pricingTitle}
        </h2>
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {text.plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col border p-6 ${
                'featured' in plan && plan.featured
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-line bg-white'
              }`}
            >
              <p className="text-sm font-medium text-zinc-600">
                {plan.timing}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {plan.name}
              </h3>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {plan.price}
              </p>
              <p className="mt-4 min-h-20 leading-7 text-zinc-700">
                {plan.description}
              </p>
              <ul className="mt-5 flex-1 space-y-3 border-t border-black/10 pt-5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm leading-6 text-zinc-700"
                  >
                    <Check
                      className="mt-1 shrink-0 text-emerald-700"
                      size={15}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={createMailto(plan.subject, language)}
                className="mt-7 inline-flex items-center justify-center gap-2
                  rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
              >
                {plan.cta}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-zinc-600">
          {text.pricingNote}
        </p>
      </section>

      <section className="border-b border-line py-14">
        <h2 className="text-4xl font-semibold tracking-tight">
          {text.processTitle}
        </h2>
        <ol
          className="mt-8 grid gap-px overflow-hidden border border-line bg-line
            sm:grid-cols-2"
        >
          {text.process.map(([title, body]) => (
            <li key={title} className="bg-white p-6">
              <h3 className="text-xl font-semibold">
                {title}
              </h3>
              <p className="mt-2 leading-7 text-zinc-700">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-b border-line py-14">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-subtle">
          {text.proofEyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">
          {text.proofTitle}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {text.proof.map((item) => {
            const external = item.href.startsWith('http')
            return (
              <article
                key={item.title}
                className="border-l-4 border-emerald-500 pl-5"
              >
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-700">
                  {item.body}
                </p>
                {external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium
                      underline underline-offset-4"
                  >
                    {item.link}
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium
                      underline underline-offset-4"
                  >
                    {item.link}
                    <ArrowRight size={15} />
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="grid gap-10 border-b border-line py-14 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            {text.fitTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {text.fit.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-7 text-zinc-700"
              >
                <CheckCircle2
                  className="mt-1 shrink-0 text-emerald-700"
                  size={18}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            {text.notFitTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {text.notFit.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-7 text-zinc-700"
              >
                <ShieldCheck
                  className="mt-1 shrink-0 text-zinc-500"
                  size={18}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 text-center sm:py-20">
        <h2
          className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight
            sm:text-5xl"
        >
          {text.finalTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-700">
          {text.finalBody}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={primaryMailto}
            className="inline-flex items-center justify-center gap-2 rounded-xl
              bg-black px-6 py-3.5 font-medium text-white"
          >
            {text.finalCta}
            <ArrowRight size={18} />
          </a>
          <a
            href={profileFacts.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border
              border-line px-6 py-3.5 font-medium"
          >
            {text.bookCta}
          </a>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          {text.footerNote}
        </p>
      </section>
    </div>
  )
}
