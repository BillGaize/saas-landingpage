import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getPostBySlug } from '@/lib/posts'
import { removePost, savePost } from '@/lib/post-storage'
import {
  normalizePostInput,
  type PostInput
} from '@/lib/post-validation'

interface RouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function PUT(
  request: Request,
  props: RouteProps
) {
  const params = await props.params
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = (await request.json()) as PostInput
    const post = normalizePostInput(body)
    const result = await savePost(params.slug, post)
    return NextResponse.json({ post, ...result })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el post.'
      },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: Request,
  props: RouteProps
) {
  const params = await props.params
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const existingPost = getPostBySlug(params.slug)

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const result = await removePost(params.slug)
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo borrar el post.'
      },
      { status: 400 }
    )
  }
}
