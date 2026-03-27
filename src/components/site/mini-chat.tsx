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
        "Hi, I am Bill's portfolio assistant. Ask about projects, tech stack, blog posts, or contact."
    }
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
            'I could not find that right now, but you can email Bill at me@billgaize.com.'
        }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I had a small issue answering that. You can still reach Bill at me@billgaize.com.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="w-[320px] rounded-2xl border border-line bg-paper shadow-xl">
          <div
            className="flex items-center justify-between border-b border-line px-4
              py-3"
          >
            <p className="text-sm font-semibold">
              Ask Bill AI
            </p>
            <button
              type="button"
              aria-label="Close chat"
              className="rounded-md p-1 hover:bg-zinc-100"
              onClick={() => {
                setOpen(false)
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
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
            {loading ? (
              <p className="text-xs text-zinc-500">
                Thinking...
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
              placeholder="Ask about projects, skills, contact..."
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />
            <button
              type="submit"
              aria-label="Send"
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
          className="inline-flex h-14 w-14 items-center justify-center
            rounded-full border border-line bg-white text-black
            shadow-lg"
          aria-label="Open portfolio assistant"
          onClick={() => {
            setOpen(true)
          }}
        >
          <MessageCircle size={22} />
        </button>
      ) : null}
    </div>
  )
}
