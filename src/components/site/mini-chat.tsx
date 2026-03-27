'use client'

import { useState } from 'react'
import { SendHorizontal } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface MiniChatProps {
  language: 'es' | 'en'
}

const CHAT_COPY = {
  es: {
    title: 'Chat con Bill AI',
    subtitle:
      'Preguntame por proyectos, edad, background, idiomas o experiencia con IA/RAG.',
    welcome:
      'Hola. Soy el asistente del portafolio de Bill. Puedes preguntarme sobre proyectos, experiencia, edad, background en salud, idiomas o como contactarlo.',
    placeholder:
      'Escribe tu pregunta sobre Bill...',
    thinking: 'Pensando...',
    fallback:
      'No encontre contexto suficiente en este momento, pero puedes escribirme a me@billgaize.com.',
    error:
      'Tuve un problema temporal respondiendo. Igual puedes escribirme a me@billgaize.com.',
    suggestions: [
      'Cuentame sobre tus proyectos en Shopify',
      'Que rol tuviste en Yango Delivery?',
      'Cual es tu edad y background?',
      'Hablas ingles y trabajas con AI/RAG?'
    ]
  },
  en: {
    title: 'Chat with Bill AI',
    subtitle:
      'Ask about projects, age, healthcare background, languages, or AI/RAG experience.',
    welcome:
      "Hi. I'm Bill's portfolio assistant. You can ask about projects, experience, age, healthcare background, languages, or how to get in touch.",
    placeholder: 'Ask anything about Bill...',
    thinking: 'Thinking...',
    fallback:
      "I couldn't find enough context right now, but you can reach out at me@billgaize.com.",
    error:
      'I had a temporary issue replying. You can still reach out at me@billgaize.com.',
    suggestions: [
      'Tell me about your Shopify projects',
      'What was your role at Yango Delivery?',
      'What is your age and background?',
      'Do you speak English and work with AI/RAG?'
    ]
  }
} as const

export function MiniChat({ language }: MiniChatProps) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const copy = CHAT_COPY[language]
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: copy.welcome
    }
  ])

  const [suggestions] = useState(copy.suggestions)

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
          content: data.reply ?? copy.fallback
        }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: copy.error
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex h-[72vh] min-h-[520px] w-full flex-col rounded-2xl border
        border-line bg-paper shadow-sm"
    >
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold">{copy.title}</p>
        <p className="mt-1 text-xs text-zinc-600">
          {copy.subtitle}
        </p>
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
                className="block w-full rounded-xl border border-line bg-zinc-50 px-3
                  py-2 text-left text-xs text-zinc-600 transition-colors
                  hover:bg-zinc-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
        {loading ? (
          <p className="text-xs text-zinc-500">
            {copy.thinking}
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
          className="h-10 flex-1 rounded-xl border border-line bg-white px-3 text-sm
            outline-none focus:border-black"
          placeholder={copy.placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
        />
        <button
          type="submit"
          aria-label="Enviar"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black
            text-white disabled:opacity-50"
          disabled={loading || !value.trim()}
        >
          <SendHorizontal size={16} />
        </button>
      </form>
    </div>
  )
}
