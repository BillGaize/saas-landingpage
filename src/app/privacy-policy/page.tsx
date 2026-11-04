import { cookies } from 'next/headers'

export default async function Page() {
  const lang =
    (await cookies()).get('site-lang')?.value === 'en'
      ? 'en'
      : 'es'

  const copy =
    lang === 'en'
      ? {
          legal: 'Legal',
          title: 'Privacy Policy',
          updated: 'Last updated: October 23, 2026',
          intro1:
            'This site collects only minimal data required to operate and improve the portfolio experience. Information is not sold.',
          intro2:
            'Data may include anonymous usage, browser metadata, and contact details you voluntarily share through email or scheduling links.',
          usageTitle: 'How information is used',
          usage1:
            'To respond to collaboration inquiries and requests.',
          usage2:
            'To analyze site performance and improve UX.',
          usage3:
            'To maintain security and reliability of the website.',
          thirdPartyTitle: 'Third-party services',
          thirdPartyText:
            'This site may use trusted external services (for example analytics, scheduling, and hosting). Each provider handles data according to its own policy.',
          analyticsTitle:
            'Analytics and session recordings',
          analyticsText:
            'This site uses PostHog (US cloud) to measure visits, page views, clicks and web performance, and to record anonymized sessions (screen interactions) to improve the experience. Text typed into form fields is masked and not recorded. Data includes approximate location (country and city), browser, device, referring page and campaign parameters (UTM). The visitor counter stores only country, device type and time; your IP address is never stored there. The referring page and city are also used to show you a one-time welcome message, and a card with your own connection details (visible only to you). It is not sold or used for advertising. The site honors the Do Not Track setting of your browser.',
          contactTitle: 'Contact',
          contactText: 'For privacy inquiries, write to:'
        }
      : {
          legal: 'Legal',
          title: 'Política de privacidad',
          updated:
            'Última actualización: 23 de octubre de 2026',
          intro1:
            'Este sitio recopila los datos mínimos para operar y mejorar el portafolio. La información no se vende.',
          intro2:
            'Los datos pueden incluir uso anónimo del sitio, metadatos del navegador y datos de contacto que compartas por correo o al agendar.',
          usageTitle: 'Cómo se usa la información',
          usage1:
            'Responder consultas y solicitudes de colaboración.',
          usage2:
            'Analizar el rendimiento del sitio y mejorar la experiencia.',
          usage3:
            'Mantener la seguridad y el funcionamiento del sitio.',
          thirdPartyTitle: 'Servicios de terceros',
          thirdPartyText:
            'Este sitio puede usar servicios externos (por ejemplo analítica, agenda y hosting). Cada proveedor maneja los datos según su propia política.',
          analyticsTitle:
            'Analítica y grabaciones de sesión',
          analyticsText:
            'Este sitio usa PostHog (nube de Estados Unidos) para medir visitas, páginas vistas, clics y rendimiento, y para grabar sesiones anonimizadas y mejorar la experiencia. El texto que escribes en formularios se enmascara y no se graba. Los datos incluyen ubicación aproximada (país y ciudad), navegador, dispositivo, página de origen y parámetros de campaña (UTM). El contador de visitantes guarda solo país, tipo de dispositivo y hora. Tu dirección IP no se guarda ahí. La página de origen y la ciudad también se usan para un mensaje de bienvenida, una sola vez, y para una nota con los datos de tu conexión, visible solo para ti. No se venden ni se usan para publicidad. El sitio respeta la opción No rastrear (Do Not Track) del navegador.',
          contactTitle: 'Contacto',
          contactText:
            'Para consultas de privacidad, escribe a:'
        }

  return (
    <article className="space-y-8 pb-14 pt-6 sm:pt-10">
      <header className="space-y-4">
        <h1 className="section-title">{copy.title}</h1>
        <p className="text-base text-subtle">
          {copy.updated}
        </p>
      </header>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <p>{copy.intro1}</p>
        <p>{copy.intro2}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.usageTitle}
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>{copy.usage1}</li>
          <li>{copy.usage2}</li>
          <li>{copy.usage3}</li>
        </ul>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.thirdPartyTitle}
        </h2>
        <p>{copy.thirdPartyText}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.analyticsTitle}
        </h2>
        <p>{copy.analyticsText}</p>
      </section>

      <section className="notion-card space-y-4 text-base leading-8 text-zinc-700">
        <h2 className="text-2xl font-semibold text-black">
          {copy.contactTitle}
        </h2>
        <p>
          {copy.contactText}
          <a
            href="mailto:me@billgaize.com"
            className="ml-1 underline"
          >
            me@billgaize.com
          </a>
        </p>
      </section>
    </article>
  )
}
