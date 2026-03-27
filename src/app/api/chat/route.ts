import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import {
  coreServices,
  profileHighlights,
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
  title: string
  type:
    | 'perfil'
    | 'servicio'
    | 'proyecto'
    | 'post'
    | 'contacto'
  text: string
  url?: string
}

const STOP_WORDS = new Set([
  'i',
  'you',
  'your',
  'this',
  'that',
  'from',
  'into',
  'can',
  'will',
  'just',
  'porfa',
  'hola',
  'quiero',
  'necesito',
  'gracias',
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
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(
      (token) => token.length > 1 && !STOP_WORDS.has(token)
    )
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
      title: 'Perfil profesional',
      type: 'perfil',
      text: `${profileFacts.name} es ${profileFacts.role}. ${profileFacts.bio} ${profileFacts.valueProposition}`
    },
    {
      id: 'contact',
      title: 'Contacto',
      type: 'contacto',
      text: `Correo: ${profileFacts.contactEmail}. Calendly: ${profileFacts.calendly}. LinkedIn: ${profileFacts.linkedin}. Ubicacion: ${profileFacts.location}.`,
      url: '/contact'
    },
    {
      id: 'services',
      title: 'Servicios principales',
      type: 'servicio',
      text: `Servicios principales: ${coreServices.join(', ')}.`
    },
    {
      id: 'highlights',
      title: 'Fortalezas clave',
      type: 'perfil',
      text: `Fortalezas: ${profileHighlights.join(' ')}`
    },
    ...portfolioProjects.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      type: 'proyecto' as const,
      text: `${project.title}. Resumen: ${project.summary}. Impacto: ${project.impact}. Stack: ${project.stack.join(', ')}.`,
      url: '/projects'
    })),
    ...posts.map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      type: 'post' as const,
      text: `${post.title}. ${post.description}. Categoria: ${post.category}. Tiempo de lectura: ${post.readingTime}. ${post.body.slice(0, 1200)}`,
      url: `/insights/${post.slug}`
    }))
  ]

  return chunks
}

function detectIntent(message: string) {
  const normalized = tokenize(message).join(' ')

  if (
    /contact|correo|email|agendar|calendly|linkedin/.test(
      normalized
    )
  ) {
    return 'contacto'
  }

  if (
    /proyecto|project|stack|tecnologia|tech/.test(
      normalized
    )
  ) {
    return 'proyectos'
  }

  if (
    /blog|post|articulo|insight|contenido/.test(normalized)
  ) {
    return 'blog'
  }

  if (
    /servicio|ofreces|ayuda|trabajo|hire/.test(normalized)
  ) {
    return 'servicios'
  }

  return 'general'
}

function formatChunkSnippet(text: string) {
  const compact = text.replace(/\s+/g, ' ').trim()
  if (compact.length <= 180) {
    return compact
  }

  return `${compact.slice(0, 180).trim()}...`
}

function buildOpenReply(
  message: string,
  ranked: Array<{ chunk: Chunk; confidence: number }>,
  history: Array<{ role: string; content: string }>
) {
  const intent = detectIntent(message)
  const introByIntent = {
    general:
      'Excelente pregunta. Te comparto una respuesta amplia basada en la informacion del portafolio:',
    proyectos:
      'Perfecto. Sobre proyectos y stack, esto es lo mas relevante:',
    servicios:
      'Claro. Sobre como Bill puede ayudarte, este es el panorama:',
    blog: 'Buen punto. En el blog y contenido tecnico, esto es lo principal:',
    contacto:
      'Sin problema. Te dejo la forma mas directa de contacto y contexto util:'
  } as const

  const recentUserContext = history
    .filter((entry) => entry.role === 'user')
    .slice(-2)
    .map((entry) => entry.content.trim())
    .filter(Boolean)

  const rankedDetails = ranked
    .slice(0, 4)
    .map((entry) => {
      const label = `${entry.chunk.type.toUpperCase()}: ${entry.chunk.title}`
      const snippet = formatChunkSnippet(entry.chunk.text)
      const linkText = entry.chunk.url
        ? ` Ruta recomendada: ${entry.chunk.url}.`
        : ''

      return `- ${label}. ${snippet}.${linkText}`
    })
    .join('\n')

  const continuation = recentUserContext.length
    ? `\nTambien estoy considerando el contexto reciente de la conversacion: ${recentUserContext.join(' | ')}`
    : ''

  const closing =
    '\n\nSi quieres, puedo profundizar en una de estas opciones con mas detalle tecnico, alcance estimado y stack recomendado segun tu caso.'

  return `${introByIntent[intent]}\n${rankedDetails}${continuation}${closing}`
}

function quickReply(message: string) {
  const normalized = message.toLowerCase()

  for (const entry of quickAnswers) {
    if (
      entry.keywords.some((keyword) =>
        normalized.includes(keyword)
      )
    ) {
      return entry.answer
    }
  }

  return null
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody
    const message = body.message?.trim()
    const history = body.history ?? []

    if (!message) {
      return NextResponse.json(
        {
          reply:
            'Escribeme una pregunta y con gusto te respondo.'
        },
        { status: 400 }
      )
    }

    const canned = quickReply(message)

    if (canned) {
      return NextResponse.json({ reply: canned })
    }

    const recentUserText = history
      .filter((entry) => entry.role === 'user')
      .slice(-2)
      .map((entry) => entry.content)
      .join(' ')

    const queryTokens = tokenize(
      `${recentUserText} ${message}`
    )
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
          'No encontre una coincidencia exacta todavia, pero puedo ayudarte con proyectos, stack, experiencia, articulos, servicios o contacto.'
      })
    }

    const reply = buildOpenReply(message, ranked, history)

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      {
        reply:
          'Tuve un problema temporal consultando el contexto del portafolio. Intenta nuevamente en unos segundos.'
      },
      { status: 500 }
    )
  }
}
