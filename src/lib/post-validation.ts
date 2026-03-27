import type { Post } from '@/lib/posts'

interface PostInput {
  title?: string
  slug?: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  category?: string
  publishedAt?: string
  updatedAt?: string
  readingTime?: string
  featured?: boolean
  hero?: string
  body?: string
}

export type { PostInput }

export function slugify(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normalizePostInput(input: PostInput): Post {
  const title = input.title?.trim() ?? ''
  const slug = slugify(input.slug ?? title)

  if (!title || !slug) {
    throw new Error('Title and slug are required')
  }

  return {
    slug,
    title,
    description: input.description?.trim() ?? '',
    seoTitle: input.seoTitle?.trim() ?? undefined,
    seoDescription:
      input.seoDescription?.trim() ?? undefined,
    category: input.category?.trim() ?? 'General',
    publishedAt: input.publishedAt?.trim() ?? '',
    updatedAt: input.updatedAt?.trim() ?? undefined,
    readingTime: input.readingTime?.trim() ?? '5 min read',
    featured: Boolean(input.featured),
    hero: input.hero?.trim() ?? '',
    body: input.body?.trim() ?? ''
  }
}
