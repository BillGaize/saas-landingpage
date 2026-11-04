import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/insights/admin-login-form'

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/admin')
  }

  return (
    <div className="flex w-full justify-center px-6 py-12 md:px-12 md:py-24">
      <div className="w-full max-w-lg border border-border p-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Entrar al panel de posts
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Usa tu contraseña de admin. Si el sitio está en
            Vercel, los cambios se guardan en el repo y el
            deploy se actualiza después.
          </p>
        </div>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
