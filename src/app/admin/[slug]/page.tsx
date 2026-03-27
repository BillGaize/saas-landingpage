import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getPostBySlug } from '@/lib/posts'
import { PostEditor } from '@/components/insights/post-editor'

interface AdminPostPageProps {
  params: {
    slug: string
  }
}

export default function AdminPostPage({
  params
}: AdminPostPageProps) {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login')
  }

  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
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
            Editar post
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            URL publica: /insights/{post.slug}
          </p>
        </div>
        <PostEditor post={post} />
      </div>
    </div>
  )
}
