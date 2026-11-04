'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Check, Copy, Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { MiniChat } from '@/components/site/mini-chat'
import { track } from '@/lib/analytics'
import { SiteFooter } from '@/components/site/site-footer'

interface SiteShellProps {
  children: React.ReactNode
}

type SiteLanguage = 'es' | 'en'

const navItems = {
  es: [
    { href: '/', label: 'Inicio' },
    { href: '/projects', label: 'Proyectos' },
    {
      href: '/services/ai-app-rescue',
      label: 'AI App Rescue'
    },
    { href: '/insights', label: 'Artículos' },
    { href: '/contact', label: 'Contacto' }
  ],
  en: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    {
      href: '/services/ai-app-rescue',
      label: 'AI App Rescue'
    },
    { href: '/insights', label: 'Articles' },
    { href: '/contact', label: 'Contact' }
  ]
} as const

const shellCopy = {
  es: {
    openNav: 'Abrir navegación',
    writeMe: 'Escríbeme',
    copy: 'Copiar',
    copied: 'Copiado',
    emailAria: 'Copiar correo',
    langButtonAria: 'Cambiar idioma',
    showAssistant: 'Mostrar asistente',
    hideAssistant: 'Ocultar asistente'
  },
  en: {
    openNav: 'Open navigation',
    writeMe: 'Email me',
    copy: 'Copy',
    copied: 'Copied',
    emailAria: 'Copy email',
    langButtonAria: 'Change language',
    showAssistant: 'Show assistant',
    hideAssistant: 'Hide assistant'
  }
} as const

function LanguageToggle({
  language,
  label,
  onClick
}: {
  language: SiteLanguage
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="border border-line px-3 py-2 text-sm"
      onClick={onClick}
    >
      <span
        className={
          language === 'es' ? 'font-semibold text-clay' : ''
        }
      >
        ES
      </span>
      {' / '}
      <span
        className={
          language === 'en' ? 'font-semibold text-clay' : ''
        }
      >
        EN
      </span>
    </button>
  )
}

export function SiteShell({ children }: SiteShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [language, setLanguage] =
    useState<SiteLanguage>('es')
  const [chatOpen, setChatOpen] = useState(false)

  const copy = shellCopy[language]
  const items = navItems[language]

  const isAppRoute = useMemo(
    () =>
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api'),
    [pathname]
  )

  useEffect(() => {
    const saved = window.localStorage.getItem('site-lang')
    if (saved === 'en' || saved === 'es') {
      setLanguage(saved)
    }
  }, [])

  const toggleLanguage = () => {
    const next: SiteLanguage =
      language === 'es' ? 'en' : 'es'

    setLanguage(next)
    window.localStorage.setItem('site-lang', next)
    document.cookie = `site-lang=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
    router.refresh()
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        'me@billgaize.com'
      )
      setEmailCopied(true)
      window.setTimeout(() => {
        setEmailCopied(false)
      }, 1800)
    } catch {
      setEmailCopied(false)
    }
  }

  if (isAppRoute) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen w-full bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-paper lg:hidden">
        <div
          className="mx-auto flex h-16 w-full max-w-7xl items-center
            justify-between px-5"
        >
          <Link href="/" className="font-heading text-2xl">
            Bill Gaize
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle
              language={language}
              label={copy.langButtonAria}
              onClick={toggleLanguage}
            />
            <button
              type="button"
              aria-label={copy.openNav}
              className="border border-line p-2.5"
              onClick={() => {
                setMobileOpen((prev) => !prev)
              }}
            >
              {mobileOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl lg:min-h-screen">
        <aside
          className="hidden w-64 shrink-0 border-r border-line px-6 py-10
            lg:block"
        >
          <div className="sticky top-10 space-y-8">
            <div className="space-y-4">
              <Link
                href="/"
                className="block font-heading text-3xl leading-none"
              >
                Bill Gaize
              </Link>
              <span
                aria-hidden
                className="block h-0.5 w-10 bg-[#8f3d2c]"
              />
              <LanguageToggle
                language={language}
                label={copy.langButtonAria}
                onClick={toggleLanguage}
              />
            </div>

            <nav aria-label="Navegación principal">
              <ul className="space-y-1">
                {items.map((item) => {
                  const active =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block py-1.5 text-lg',
                          active
                            ? 'text-clay'
                            : 'hover:text-clay'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:me@billgaize.com"
                className="block text-clay underline"
              >
                {copy.writeMe}
              </a>
              <button
                type="button"
                data-attr="chat-toggle"
                onClick={() => {
                  track('chat_toggled', {
                    opened: !chatOpen
                  })
                  setChatOpen((prev) => !prev)
                }}
                className="block text-left underline"
              >
                {chatOpen
                  ? copy.hideAssistant
                  : copy.showAssistant}
              </button>
              <button
                type="button"
                onClick={() => {
                  void copyEmailToClipboard()
                }}
                aria-label={copy.emailAria}
                className="flex w-full items-center justify-between gap-2 border
                  border-line px-3 py-2 text-left text-zinc-700"
              >
                <span className="truncate">
                  me@billgaize.com
                </span>
                <span className="inline-flex items-center gap-1 text-xs">
                  {emailCopied ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                  {emailCopied ? copy.copied : copy.copy}
                </span>
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <main
            className="min-h-[calc(100vh-4rem)] px-5 py-8 sm:px-8 lg:min-h-screen
              lg:px-12 lg:py-12"
          >
            {mobileOpen ? (
              <div className="mb-8 border border-line p-3 lg:hidden">
                <nav aria-label="Navegación móvil">
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const active =
                        item.href === '/'
                          ? pathname === '/'
                          : pathname === item.href ||
                            pathname.startsWith(
                              `${item.href}/`
                            )
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => {
                              setMobileOpen(false)
                            }}
                            className={cn(
                              'block px-2 py-2 text-lg',
                              active
                                ? 'text-clay'
                                : 'hover:text-clay'
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                <button
                  type="button"
                  onClick={() => {
                    void copyEmailToClipboard()
                  }}
                  className="mt-3 flex w-full items-center justify-between border
                    border-line px-3 py-2 text-sm text-zinc-700"
                >
                  <span className="truncate">
                    me@billgaize.com
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs">
                    {emailCopied ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                    {emailCopied ? copy.copied : copy.copy}
                  </span>
                </button>
              </div>
            ) : null}

            <div className="mx-auto w-full max-w-3xl">
              {children}
              <div className="mt-16 border-t border-line pt-6">
                {chatOpen ? (
                  <MiniChat
                    language={language}
                    onHide={() => {
                      setChatOpen(false)
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    data-attr="chat-open"
                    onClick={() => {
                      track('chat_opened', {
                        device: 'inline'
                      })
                      setChatOpen(true)
                    }}
                    className="text-sm underline"
                  >
                    {copy.showAssistant}
                  </button>
                )}
              </div>
            </div>
          </main>
          <SiteFooter language={language} />
        </div>
      </div>
    </div>
  )
}
