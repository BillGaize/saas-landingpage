'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/posts'
import { slugify } from '@/lib/post-validation'

interface PostEditorProps {
  post?: Post
}

interface SavePostResponse {
  error?: string
  mode?: 'local' | 'github'
  post: Post
}

interface DeletePostResponse {
  error?: string
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [description, setDescription] = useState(
    post?.description ?? ''
  )
  const [seoTitle, setSeoTitle] = useState(
    post?.seoTitle ?? ''
  )
  const [seoDescription, setSeoDescription] = useState(
    post?.seoDescription ?? ''
  )
  const [category, setCategory] = useState(
    post?.category ?? 'AI Writing'
  )
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ?? getToday()
  )
  const [updatedAt, setUpdatedAt] = useState(
    post?.updatedAt ?? getToday()
  )
  const [readingTime, setReadingTime] = useState(
    post?.readingTime ?? '4 min read'
  )
  const [featured, setFeatured] = useState(
    post?.featured ?? false
  )
  const [hero, setHero] = useState(post?.hero ?? '')
  const [body, setBody] = useState(post?.body ?? '')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  const previewUrl = useMemo(() => {
    const currentSlug = slugify(
      slug.length > 0 ? slug : title
    )
    return currentSlug ? `/insights/${currentSlug}` : ''
  }, [slug, title])

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    setSaving(true)
    setStatus('')

    const response = await fetch(
      post
        ? `/api/admin/posts/${post.slug}`
        : '/api/admin/posts',
      {
        method: post ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          seoTitle,
          seoDescription,
          category,
          publishedAt,
          updatedAt,
          readingTime,
          featured,
          hero,
          body
        })
      }
    )

    const data = (await response.json()) as SavePostResponse

    if (!response.ok) {
      setStatus(data.error ?? 'No se pudo guardar el post.')
      setSaving(false)
      return
    }

    setStatus(
      data.mode === 'github'
        ? 'Post guardado. GitHub recibio el cambio y el deploy deberia actualizarse en uno o dos minutos.'
        : 'Post guardado en local.'
    )
    setSaving(false)
    router.push(`/admin/${data.post.slug}`)
    router.refresh()
  }

  async function handleDelete() {
    if (!post) {
      return
    }

    const confirmed = window.confirm(
      'Esto borrara el post. Quieres continuar?'
    )

    if (!confirmed) {
      return
    }

    setSaving(true)
    setStatus('')

    const response = await fetch(
      `/api/admin/posts/${post.slug}`,
      {
        method: 'DELETE'
      }
    )

    const data =
      (await response.json()) as DeletePostResponse

    if (!response.ok) {
      setStatus(data.error ?? 'No se pudo borrar el post.')
      setSaving(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form
      className="space-y-8 rounded-[2rem] border border-border/70 bg-card/60
        p-6 md:p-10"
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Titulo
          </span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
            }}
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Slug</span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={slug}
            onChange={(event) => {
              setSlug(slugify(event.target.value))
            }}
            placeholder="se-genera-a-partir-del-titulo"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Descripcion
          </span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Categoria
          </span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value)
            }}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Fecha de publicacion
          </span>
          <input
            type="date"
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={publishedAt}
            onChange={(event) => {
              setPublishedAt(event.target.value)
            }}
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Fecha de actualizacion
          </span>
          <input
            type="date"
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={updatedAt}
            onChange={(event) => {
              setUpdatedAt(event.target.value)
            }}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">
            Reading time
          </span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={readingTime}
            onChange={(event) => {
              setReadingTime(event.target.value)
            }}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Hero</span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={hero}
            onChange={(event) => {
              setHero(event.target.value)
            }}
          />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium">
            SEO title
          </span>
          <input
            className="w-full rounded-xl border bg-background px-4 py-3"
            value={seoTitle}
            onChange={(event) => {
              setSeoTitle(event.target.value)
            }}
          />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium">
            SEO description
          </span>
          <textarea
            className="min-h-24 w-full rounded-xl border bg-background px-4 py-3"
            value={seoDescription}
            onChange={(event) => {
              setSeoDescription(event.target.value)
            }}
          />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium">
            Body en Markdown
          </span>
          <textarea
            className="min-h-[420px] w-full rounded-xl border bg-background px-4
              py-3 font-mono text-sm"
            value={body}
            onChange={(event) => {
              setBody(event.target.value)
            }}
            required
          />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event) => {
            setFeatured(event.target.checked)
          }}
        />
        Mostrar destacado en home
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold
            text-primary-foreground"
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Guardar post'}
        </button>
        {previewUrl ? (
          <a
            href={previewUrl}
            target="_blank"
            className="text-sm text-muted-foreground underline-offset-4
              hover:underline"
          >
            Ver post
          </a>
        ) : null}
        {post ? (
          <button
            type="button"
            onClick={() => {
              void handleDelete()
            }}
            className="rounded-xl border border-destructive px-4 py-2 text-sm
              font-semibold text-destructive"
            disabled={saving}
          >
            Borrar post
          </button>
        ) : null}
      </div>

      {status ? (
        <p className="text-sm text-muted-foreground">
          {status}
        </p>
      ) : null}
    </form>
  )
}
