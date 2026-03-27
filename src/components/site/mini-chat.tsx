'use client'

import { useState } from 'react'
import {
  MessageCircle,
  SendHorizonal,
  X
} from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function MiniChat() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hola. Soy el asistente del portafolio de Bill. Puedes preguntarme sobre experiencia, proyectos, stack, articulos del blog o como contactarlo.'
    }
  ])

  const [suggestions] = useState([
    'Que tipo de proyectos construye Bill?',
    'En que me puede ayudar para mi negocio?',
    'Resume su experiencia en 3 puntos',
    'Como lo contacto para trabajar juntos?'
  ])

  const sendMessage = async () => {
    const trimmed = value.trim()

    if (!trimmed || loading) {
      return
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed }
    ]

    setMessages(nextMessages)
    setValue('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-6)
        })
      })

      if (!response.ok) {
        throw new Error('Chat request failed')
      }

      const data = (await response.json()) as {
        reply?: string
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply ??
            'No encontre contexto suficiente en este momento, pero puedes escribirme a me@billgaize.com.'
        }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Tuve un problema temporal respondiendo. Igual puedes escribirme a me@billgaize.com.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="flex h-[520px] w-[360px] flex-col rounded-2xl border border-line bg-paper shadow-xl sm:w-[400px]">
          <div
            className="flex items-center justify-between border-b border-line px-4
              py-3"
          >
            <p className="text-sm font-semibold">
              Chat con Bill AI
            </p>
            <button
              type="button"
              aria-label="Cerrar chat"
              className="rounded-md p-1 hover:bg-zinc-100"
              onClick={() => {
                setOpen(false)
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index.toString()}`}
                className={
                  message.role === 'assistant'
                    ? 'mr-5'
                    : 'ml-5'
                }
              >
                <p
                  className={
                    message.role === 'assistant'
                      ? `rounded-xl border border-line bg-white px-3 py-2 text-sm
                        text-zinc-700`
                      : 'rounded-xl bg-black px-3 py-2 text-sm text-white'
                  }
                >
                  {message.content}
                </p>
              </div>
            ))}
            {messages.length <= 1 ? (
              <div className="space-y-2 pt-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setValue(suggestion)
                    }}
                    className="block w-full rounded-xl border border-line bg-zinc-50 px-3 py-2 text-left text-xs text-zinc-600 transition-colors hover:bg-zinc-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
            {loading ? (
              <p className="text-xs text-zinc-500">
                Pensando...
              </p>
            ) : null}
          </div>

          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault()
              void sendMessage()
            }}
          >
            <input
              className="h-10 flex-1 rounded-xl border border-line bg-white px-3
                text-sm outline-none focus:border-black"
              placeholder="Preguntame cualquier cosa sobre Bill..."
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                bg-black text-white disabled:opacity-50"
              disabled={loading || !value.trim()}
            >
              <SendHorizonal size={16} />
            </button>
          </form>
        </div>
      ) : null}

      {!open ? (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-line
            bg-white px-4 py-3 text-sm font-medium text-black shadow-lg"
          aria-label="Abrir asistente del portafolio"
          onClick={() => {
            setOpen(true)
          }}
        >
          <MessageCircle size={18} />
          Chat
        </button>
      ) : null}
    </div>
  )
}
