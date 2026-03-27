import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group block rounded-2xl border border-line bg-white px-6 py-5 transition-colors hover:bg-zinc-50"
    >
      <div className="flex items-center gap-3 text-sm text-subtle">
        <span>{new Date(post.publishedAt).toLocaleDateString('es-CL')}</span>
        <span>•</span>
        <span>{post.readingTime}</span>
        <span>•</span>
        <span>{post.category}</span>
      </div>
      <h3 className="mt-2 text-3xl font-semibold tracking-tight text-black">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-lg leading-8 text-zinc-700">
        {post.description}
      </p>
      <div className="mt-4 text-sm font-medium text-black">
        <span className="inline-flex items-center gap-2">
          Read article <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
