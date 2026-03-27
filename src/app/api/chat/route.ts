import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import {
  coreServices,
  portfolioProjects,
  profileFacts,
  quickAnswers
} from '@/lib/profile-data'

interface ChatBody {
  message?: string
  history?: Array<{ role: string; content: string }>
}

interface Chunk {
  id: string
  text: string
}

const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'is',
  'are',
  'to',
  'for',
  'of',
  'in',
  'on',
  'with',
  'how',
  'what',
  'where',
  'when',
  'who',
  'about',
  'de',
  'la',
  'el',
  'los',
  'las',
  'un',
  'una',
  'y',
  'o',
  'en',
  'que',
  'como',
  'para',
  'con',
  'por',
  'del',
  'al'
])

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
}

function score(text: string, queryTokens: string[]) {
  const haystack = tokenize(text)
  if (haystack.length === 0 || queryTokens.length === 0) {
    return 0
  }

  let hits = 0

  for (const token of queryTokens) {
    if (haystack.includes(token)) {
      hits += 1
    }
  }

  return hits / queryTokens.length
}

function buildKnowledgeBase() {
  const posts = getAllPosts()

  const chunks: Chunk[] = [
    {
      id: 'profile',
      text: `${profileFacts.name} is a ${profileFacts.role}. ${profileFacts.bio}`
    },
    {
      id: 'contact',
      text: `Contact email: ${profileFacts.contactEmail}. Calendly: ${profileFacts.calendly}. LinkedIn: ${profileFacts.linkedin}.`
    },
    {
      id: 'services',
      text: `Core services: ${coreServices.join(', ')}.`
    },
    ...portfolioProjects.map((project) => ({
      id: `project-${project.slug}`,
      text: `${project.title}. ${project.summary}. ${project.impact}. Stack: ${project.stack.join(', ')}.`
    })),
    ...posts.map((post) => ({
      id: `post-${post.slug}`,
      text: `${post.title}. ${post.description}. Category ${post.category}. Reading time ${post.readingTime}.`
    }))
  ]

  return chunks
}

function quickReply(message: string) {
  const normalized = message.toLowerCase()

  for (const entry of quickAnswers) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.answer
    }
  }

  return null
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody
    const message = body.message?.trim()

    if (!message) {
      return NextResponse.json(
        { reply: 'Please ask a question so I can help.' },
        { status: 400 }
      )
    }

    const canned = quickReply(message)

    if (canned) {
      return NextResponse.json({ reply: canned })
    }

    const queryTokens = tokenize(message)
    const knowledge = buildKnowledgeBase()

    const ranked = knowledge
      .map((chunk) => ({
        chunk,
        confidence: score(chunk.text, queryTokens)
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3)
      .filter((entry) => entry.confidence > 0)

    if (ranked.length === 0) {
      return NextResponse.json({
        reply:
          'I do not have a direct match for that yet. You can ask about projects, stack, insights, or contact details.'
      })
    }

    const context = ranked
      .map((entry) => `- ${entry.chunk.text}`)
      .join('\n')

    const reply = [
      'Based on Bill\'s portfolio details:',
      context,
      '',
      'If you want, I can also suggest which project is most relevant for your use case.'
    ].join('\n')

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      {
        reply:
          'I hit a temporary issue while searching the portfolio context. Please try again.'
      },
      { status: 500 }
    )
  }
}
