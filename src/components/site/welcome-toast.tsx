'use client'

import { countryMeta } from '@/lib/countries'
import { track } from '@/lib/analytics'
import { detectSource } from '@/lib/traffic-source'
import { useEffect, useState } from 'react'

type Lang = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it'

const SEEN_KEY = 'bg_welcome_seen'

interface Pack {
  hello: string
  from: string
  named: (label: string) => string
  cv: string
  email: string
  shared: string
  ai: (label: string) => string
  direct: string
}

const PACKS: Record<Lang, Pack> = {
  es: {
    hello: 'Bienvenido',
    from: 'desde',
    named: (l) => `Gracias por venir desde ${l}.`,
    cv: 'Veo que llegaste desde mi CV. Un gusto.',
    email: 'Gracias por pasar desde mi correo.',
    shared:
      'Alguien te compartio mi sitio. Gracias por entrar.',
    ai: (l) => `Te recomendo ${l}. Espero que te sirva.`,
    direct: 'Gracias por visitar mi sitio.'
  },
  en: {
    hello: 'Welcome',
    from: 'from',
    named: (l) => `Thanks for coming over from ${l}.`,
    cv: 'I see you came from my CV. Nice to meet you.',
    email: 'Thanks for stopping by from my email.',
    shared:
      'Someone shared my site with you. Thanks for visiting.',
    ai: (l) => `${l} sent you my way. Hope it helps.`,
    direct: 'Thanks for visiting my site.'
  },
  pt: {
    hello: 'Bem-vindo',
    from: 'de',
    named: (l) => `Obrigado por vir do ${l}.`,
    cv: 'Vejo que voce veio do meu CV. Prazer.',
    email: 'Obrigado por passar pelo meu email.',
    shared:
      'Alguem compartilhou meu site com voce. Obrigado.',
    ai: (l) => `${l} te indicou. Espero que ajude.`,
    direct: 'Obrigado por visitar meu site.'
  },
  fr: {
    hello: 'Bienvenue',
    from: 'depuis',
    named: (l) => `Merci de venir depuis ${l}.`,
    cv: 'Je vois que vous venez de mon CV. Enchante.',
    email: 'Merci de passer depuis mon email.',
    shared:
      "Quelqu'un a partage mon site avec vous. Merci.",
    ai: (l) =>
      `${l} vous a envoye ici. J'espere que ca aide.`,
    direct: 'Merci de visiter mon site.'
  },
  de: {
    hello: 'Willkommen',
    from: 'aus',
    named: (l) => `Danke, dass du von ${l} kommst.`,
    cv: 'Du kommst von meinem Lebenslauf. Freut mich.',
    email: 'Danke fuers Vorbeischauen aus meiner E-Mail.',
    shared:
      'Jemand hat meine Seite mit dir geteilt. Danke.',
    ai: (l) =>
      `${l} hat dich hierher geschickt. Viel Erfolg.`,
    direct: 'Danke fuer deinen Besuch.'
  },
  it: {
    hello: 'Benvenuto',
    from: 'da',
    named: (l) => `Grazie per essere arrivato da ${l}.`,
    cv: 'Vedo che arrivi dal mio CV. Piacere.',
    email: 'Grazie per essere passato dalla mia email.',
    shared:
      'Qualcuno ha condiviso il mio sito con te. Grazie.',
    ai: (l) =>
      `${l} ti ha mandato qui. Spero ti sia utile.`,
    direct: 'Grazie per la visita.'
  }
}

function pickLang(siteLanguage: 'es' | 'en'): Lang {
  const nav = (navigator.language || '')
    .slice(0, 2)
    .toLowerCase()
  return nav in PACKS ? (nav as Lang) : siteLanguage
}

export function WelcomeToast({
  language
}: {
  language: 'es' | 'en'
}) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      return
    }

    const source = detectSource(
      window.location.search,
      document.referrer,
      window.location.hostname
    )

    let cancelled = false

    void (async () => {
      let city = ''
      let country = ''
      try {
        const response = await fetch('/api/geo')
        if (response.ok) {
          const data = (await response.json()) as {
            city?: string
            country?: string
          }
          city = data.city ?? ''
          country = data.country ?? ''
        }
      } catch {
        // geo is optional
      }

      // Direct visitors with no city get no popup: nothing useful to say.
      if (cancelled || (!source && !city)) {
        return
      }

      const lang = pickLang(language)
      const pack = PACKS[lang]
      const flag = country
        ? countryMeta(country, 'en').flag
        : ''
      const head = city
        ? `${flag} ${pack.hello} ${pack.from} ${city}!`.trim()
        : `${pack.hello}!`

      let body = pack.direct
      if (source) {
        body =
          source.kind === 'cv'
            ? pack.cv
            : source.kind === 'email'
              ? pack.email
              : source.kind === 'shared'
                ? pack.shared
                : source.kind === 'ai'
                  ? pack.ai(source.label)
                  : pack.named(source.label)
      }

      sessionStorage.setItem(SEEN_KEY, '1')
      setMessage(`${head} ${body}`)
      track('welcome_shown', {
        source: source?.key ?? 'direct',
        language: lang,
        has_city: Boolean(city)
      })
    })()

    return () => {
      cancelled = true
    }
  }, [language])

  useEffect(() => {
    if (!message) {
      return
    }
    const timeout = window.setTimeout(() => {
      setMessage('')
    }, 9000)
    return () => {
      window.clearTimeout(timeout)
    }
  }, [message])

  if (!message) {
    return null
  }

  return (
    <div
      role="status"
      data-attr="welcome-toast"
      className="fixed bottom-4 right-4 z-50 flex max-w-xs items-start gap-2
        rounded-xl border border-line bg-white px-3 py-2 text-xs
        text-zinc-700 shadow-lg"
    >
      <span>{message}</span>
      <button
        type="button"
        aria-label="Close"
        onClick={() => {
          setMessage('')
        }}
        className="text-zinc-400 hover:text-zinc-700"
      >
        x
      </button>
    </div>
  )
}
