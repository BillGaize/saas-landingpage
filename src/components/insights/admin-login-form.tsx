'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginResponse {
  error?: string
}

export function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })

    const data = (await response.json()) as LoginResponse

    if (!response.ok) {
      setError(data.error ?? 'No se pudo iniciar sesion.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
    >
      <label className="space-y-2 block">
        <span className="text-sm font-medium">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          className="w-full rounded-xl border bg-background px-4 py-3"
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold
          text-primary-foreground"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}
    </form>
  )
}
