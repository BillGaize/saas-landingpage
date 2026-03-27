'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Briefcase,
  Check,
  Copy,
  FileText,
  Home,
  Mail,
  Menu,
  MessageSquareText,
  X
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { MiniChat } from '@/components/site/mini-chat'

interface SiteShellProps {
  children: React.ReactNode
}

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  {
    href: '/projects',
    label: 'Proyectos',
    icon: Briefcase
  },
  { href: '/insights', label: 'Blog', icon: FileText },
  { href: '/contact', label: 'Contacto', icon: Mail }
]

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const isAppRoute = useMemo(
    () =>
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api'),
    [pathname]
  )

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
          <button
            type="button"
            aria-label="Abrir navegacion"
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
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-0 lg:min-h-screen">
        <aside
          className="hidden w-[280px] shrink-0 border-r border-line px-5 py-8
            lg:block"
        >
          <div className="sticky top-8 space-y-10">
            <Link
              href="/"
              className="block text-4xl font-semibold tracking-tight"
            >
              Bill Gaize Dev
            </Link>

            <nav
              className="space-y-2"
              aria-label="Navegacion principal"
            >
              {navItems.map((item) => {
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
                Escribeme
              </a>
              <button
                type="button"
                onClick={() => {
                  void copyEmailToClipboard()
                }}
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
                  {emailCopied ? 'Copiado' : 'Copiar'}
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
                {navItems.map((item) => {
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
                  {emailCopied ? 'Copiado' : 'Copiar'}
                </span>
              </button>
            </div>
          ) : null}

          <div className="mx-auto w-full max-w-4xl">
            {children}
          </div>
        </main>
      </div>

      <MiniChat />
    </div>
  )
}
