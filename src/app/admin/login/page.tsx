import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/insights/admin-login-form'

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) {
    redirect('/admin')
  }

  return (
    <div className="flex w-full justify-center px-6 py-12 md:px-12 md:py-24">
      <div
        className="w-full max-w-lg rounded-[2rem] border border-border/70
          bg-card/60 p-8"
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Admin
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Entrar al panel de posts
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Usa tu password de admin. Si el sitio esta en
            Vercel, los cambios se guardan al repo y el
            deploy se actualiza despues.
          </p>
        </div>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
