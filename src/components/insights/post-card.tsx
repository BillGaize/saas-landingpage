import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
  language: 'es' | 'en'
}

export function PostCard({
  post,
  language
}: PostCardProps) {
  const locale = language === 'en' ? 'en-US' : 'es-CL'

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="block border-t border-line py-5"
    >
      <p className="text-sm text-subtle">
        {new Date(post.publishedAt).toLocaleDateString(
          locale
        )}
        {' · '}
        {post.readingTime}
        {' · '}
        {post.category}
      </p>
      <h2 className="mt-2 text-3xl text-black">
        {post.title}
      </h2>
      <p className="mt-2 text-lg leading-8 text-zinc-800">
        {post.description}
      </p>
    </Link>
  )
}
