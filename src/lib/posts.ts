import fs from 'fs'
import path from 'path'

export interface Post {
  slug: string
  title: string
  description: string
  seoTitle?: string
  seoDescription?: string
  category: string
  publishedAt: string
  updatedAt?: string
  readingTime: string
  featured: boolean
  unlisted?: boolean
  hero: string
  body: string
}

const postsDirectory = path.join(
  process.cwd(),
  'content/posts'
)

function readPostFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as Post
}

export function getPostsDirectory() {
  return postsDirectory
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [] as Post[]
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) =>
      readPostFile(path.join(postsDirectory, fileName))
    )
    .sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : -1
    )
}

export function getPublicPosts() {
  return getAllPosts().filter((post) => !post.unlisted)
}

export function getFeaturedPosts() {
  return getPublicPosts().filter((post) => post.featured)
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getPublicPostBySlug(slug: string) {
  const post = getPostBySlug(slug)
  if (!post || post.unlisted) {
    return undefined
  }
  return post
}

export function getPostFilePath(slug: string) {
  return path.join(postsDirectory, `${slug}.json`)
}

export function serializePost(post: Post) {
  return `${JSON.stringify(post, null, 2)}\n`
}
