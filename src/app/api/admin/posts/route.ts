import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getAllPosts } from '@/lib/posts'
import { savePost } from '@/lib/post-storage'
import {
  normalizePostInput,
  type PostInput
} from '@/lib/post-validation'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({ posts: getAllPosts() })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = (await request.json()) as PostInput
    const post = normalizePostInput(body)
    const result = await savePost(null, post)
    return NextResponse.json({ post, ...result })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo crear el post.'
      },
      { status: 400 }
    )
  }
}
