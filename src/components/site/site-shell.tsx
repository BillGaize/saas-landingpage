'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Briefcase,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Home,
  Mail,
  Menu,
  MessageSquareText,
  X
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { MiniChat } from '@/components/site/mini-chat'
import { SiteFooter } from '@/components/site/site-footer'

interface SiteShellProps {
  children: React.ReactNode
}

type SiteLanguage = 'es' | 'en'

const navItems = {
  es: [
    { href: '/', label: 'Inicio', icon: Home },
    {
      href: '/projects',
      label: 'Proyectos',
      icon: Briefcase
    },
    { href: '/insights', label: 'Blog', icon: FileText },
    { href: '/contact', label: 'Contacto', icon: Mail }
  ],
  en: [
    { href: '/', label: 'Home', icon: Home },
    {
      href: '/projects',
      label: 'Projects',
      icon: Briefcase
    },
    { href: '/insights', label: 'Blog', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Mail }
  ]
} as const

const shellCopy = {
  es: {
    openNav: 'Abrir navegacion',
    writeMe: 'Escribeme',
    copy: 'Copiar',
    copied: 'Copiado',
    emailAria: 'Copiar correo',
    langButtonAria: 'Cambiar idioma',
    showAssistant: 'Mostrar asistente',
    hideAssistant: 'Ocultar asistente'
  },
  en: {
    openNav: 'Open navigation',
    writeMe: 'Write me',
    copy: 'Copy',
    copied: 'Copied',
    emailAria: 'Copy email',
    langButtonAria: 'Change language',
    showAssistant: 'Show assistant',
    hideAssistant: 'Hide assistant'
  }
} as const

export function SiteShell({ children }: SiteShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [language, setLanguage] =
    useState<SiteLanguage>('es')
  const [chatOpen, setChatOpen] = useState(true)

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
      <div className="pointer-events-none fixed inset-0 -z-10 mesh-bg" />

      <header
        className="sticky top-0 z-40 border-b border-line bg-paper/90
          backdrop-blur-md lg:hidden"
      >
        <div
          className="mx-auto flex h-20 w-full max-w-7xl items-center
            justify-between px-5"
        >
          <Link
            href="/"
            className="text-4xl font-semibold tracking-tight"
          >
            Bill Gaize Dev
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={copy.langButtonAria}
              className="rounded-xl border border-line px-3 py-2 text-sm font-medium"
              onClick={toggleLanguage}
            >
              {language === 'es' ? '🇺🇸' : '🇪🇸'}
            </button>
            <button
              type="button"
              aria-label={copy.openNav}
              className="rounded-xl border border-line p-2.5"
              onClick={() => {
                setMobileOpen((prev) => !prev)
              }}
            >
              {mobileOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1500px] gap-0 lg:min-h-screen">
        <aside
          className="hidden w-[280px] shrink-0 border-r border-line px-5 py-8
            lg:block"
        >
          <div className="sticky top-8 space-y-10">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="block text-4xl font-semibold tracking-tight"
              >
                Bill Gaize Dev
              </Link>
              <button
                type="button"
                aria-label={copy.langButtonAria}
                className="rounded-xl border border-line px-3 py-2 text-sm font-medium"
                onClick={toggleLanguage}
              >
                {language === 'es' ? '🇺🇸' : '🇪🇸'}
              </button>
            </div>

            <nav
              className="space-y-2"
              aria-label="Navegacion principal"
            >
              {items.map((item) => {
                const Icon = item.icon
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-xl
                        transition-colors`,
                      active
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-zinc-100'
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="space-y-2">
              <a
                href="mailto:me@billgaize.com"
                className="inline-flex w-full items-center gap-2 rounded-xl border
                  border-line px-4 py-3 text-base"
              >
                <MessageSquareText size={18} />
                {copy.writeMe}
              </a>
              <button
                type="button"
                onClick={() => {
                  setChatOpen((prev) => !prev)
                }}
                className="inline-flex w-full items-center justify-center gap-2
                  rounded-xl border border-line bg-zinc-50 px-4 py-2.5 text-sm"
              >
                {chatOpen ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
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
                className="flex w-full items-center justify-between rounded-xl border
                  border-line bg-zinc-50 px-4 py-2.5 text-sm text-zinc-700"
              >
                <span className="truncate">
                  me@billgaize.com
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium">
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

        <main
          className="min-h-[calc(100vh-80px)] flex-1 px-5 py-8 sm:px-8
            lg:min-h-screen lg:px-12 lg:py-12"
        >
          {mobileOpen ? (
            <div className="mb-8 rounded-2xl border border-line bg-paper p-3 lg:hidden">
              <nav
                className="space-y-1"
                aria-label="Navegacion movil"
              >
                {items.map((item) => {
                  const Icon = item.icon
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setMobileOpen(false)
                      }}
                      className={cn(
                        `flex items-center gap-3 rounded-xl px-3 py-3 text-lg
                          transition-colors`,
                        active
                          ? 'bg-black text-white'
                          : 'text-black hover:bg-zinc-100'
                      )}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
              <button
                type="button"
                onClick={() => {
                  void copyEmailToClipboard()
                }}
                className="mt-3 flex w-full items-center justify-between rounded-xl
                  border border-line bg-zinc-50 px-3 py-2.5 text-sm
                  text-zinc-700"
              >
                <span className="truncate">
                  me@billgaize.com
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium">
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

          <div className="mx-auto w-full max-w-4xl">
            {children}
          </div>

          {chatOpen ? (
            <div className="mt-10 xl:hidden">
              <MiniChat
                language={language}
                onHide={() => {
                  setChatOpen(false)
                }}
              />
            </div>
          ) : (
            <div className="mt-10 xl:hidden">
              <button
                type="button"
                onClick={() => {
                  setChatOpen(true)
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-line
                  px-4 py-2.5 text-sm font-medium"
              >
                <Eye size={16} />
                {copy.showAssistant}
              </button>
            </div>
          )}
        </main>

        <aside
          className="hidden w-[420px] shrink-0 border-l border-line px-4 py-8
            xl:block"
        >
          <div className="sticky top-8">
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
                onClick={() => {
                  setChatOpen(true)
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-line
                  px-4 py-2.5 text-sm font-medium"
              >
                <Eye size={16} />
                {copy.showAssistant}
              </button>
            )}
          </div>
        </aside>
      </div>

      <SiteFooter language={language} />
    </div>
  )
}
