import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAllPosts } from '@/lib/posts'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminLogoutButton } from '@/components/insights/admin-logout-button'

export default function AdminPostsPage() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login')
  }

  const posts = getAllPosts()

  return (
    <div className="flex w-full justify-center px-6 py-12 md:px-12 md:py-24">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Admin
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Gestion de posts
            </h1>
            <p className="text-sm leading-7 text-muted-foreground">
              Crea, edita y borra posts. Si usas GitHub como
              storage, cada cambio dispara un nuevo deploy
              del sitio.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/new"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold
                text-primary-foreground"
            >
              Nuevo post
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border/70">
          <table className="w-full">
            <thead className="bg-card/80">
              <tr className="text-left text-sm">
                <th className="px-6 py-4 font-medium">
                  Titulo
                </th>
                <th className="px-6 py-4 font-medium">
                  Slug
                </th>
                <th className="px-6 py-4 font-medium">
                  Fecha
                </th>
                <th className="px-6 py-4 font-medium">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-t border-border/70 text-sm"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/${post.slug}`}
                      className="font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {post.slug}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {post.publishedAt}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {post.featured
                      ? 'Featured'
                      : 'Standard'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
