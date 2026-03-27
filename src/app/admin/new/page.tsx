import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { PostEditor } from '@/components/insights/post-editor'

export default function NewPostPage() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login')
  }

  return (
    <div className="flex w-full justify-center px-6 py-12 md:px-12 md:py-24">
      <div className="w-full max-w-5xl space-y-6">
        <Link
          href="/admin"
          className="inline-flex text-sm text-muted-foreground
            hover:text-foreground"
        >
          Volver al admin
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Crear nuevo post
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Escribe el cuerpo en Markdown. Al guardar, el
            sitio se redeploya.
          </p>
        </div>
        <PostEditor />
      </div>
    </div>
  )
}
