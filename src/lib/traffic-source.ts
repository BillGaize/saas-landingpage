export type SourceKind =
  | 'named'
  | 'cv'
  | 'email'
  | 'shared'
  | 'ai'
  | 'direct'

export interface TrafficSource {
  kind: SourceKind
  label: string
  key: string
}

interface Rule {
  key: string
  label: string
  kind: SourceKind
  match: string[]
}

// Order matters: first match wins. `match` is checked against
// utm_source/ref and against the referrer hostname.
const RULES: Rule[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    kind: 'named',
    match: ['linkedin', 'lnkd.in']
  },
  {
    key: 'github',
    label: 'GitHub',
    kind: 'named',
    match: ['github']
  },
  {
    key: 'x',
    label: 'X',
    kind: 'named',
    match: ['twitter', 't.co', 'x.com', 'x']
  },
  {
    key: 'indeed',
    label: 'Indeed',
    kind: 'named',
    match: ['indeed']
  },
  {
    key: 'wellfound',
    label: 'Wellfound',
    kind: 'named',
    match: ['wellfound', 'angel.co']
  },
  {
    key: 'glassdoor',
    label: 'Glassdoor',
    kind: 'named',
    match: ['glassdoor']
  },
  {
    key: 'ycombinator',
    label: 'Hacker News',
    kind: 'named',
    match: ['ycombinator', 'hackernews', 'hn']
  },
  {
    key: 'workatastartup',
    label: 'Work at a Startup',
    kind: 'named',
    match: ['workatastartup']
  },
  {
    key: 'getonboard',
    label: 'Get on Board',
    kind: 'named',
    match: ['getonboard']
  },
  {
    key: 'computrabajo',
    label: 'Computrabajo',
    kind: 'named',
    match: ['computrabajo']
  },
  {
    key: 'chatgpt',
    label: 'ChatGPT',
    kind: 'ai',
    match: ['chatgpt', 'openai']
  },
  {
    key: 'perplexity',
    label: 'Perplexity',
    kind: 'ai',
    match: ['perplexity']
  },
  {
    key: 'claude',
    label: 'Claude',
    kind: 'ai',
    match: ['claude.ai', 'anthropic']
  },
  {
    key: 'gemini',
    label: 'Gemini',
    kind: 'ai',
    match: [
      'gemini.google.com',
      'gemini',
      'bard.google.com'
    ]
  },
  {
    key: 'copilot',
    label: 'Copilot',
    kind: 'ai',
    match: ['copilot']
  },
  {
    key: 'google',
    label: 'Google',
    kind: 'named',
    match: ['google']
  },
  {
    key: 'bing',
    label: 'Bing',
    kind: 'named',
    match: ['bing']
  },
  {
    key: 'duckduckgo',
    label: 'DuckDuckGo',
    kind: 'named',
    match: ['duckduckgo']
  },
  {
    key: 'reddit',
    label: 'Reddit',
    kind: 'named',
    match: ['reddit']
  },
  {
    key: 'youtube',
    label: 'YouTube',
    kind: 'named',
    match: ['youtube', 'youtu.be']
  },
  {
    key: 'instagram',
    label: 'Instagram',
    kind: 'named',
    match: ['instagram']
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    kind: 'named',
    match: ['tiktok']
  },
  {
    key: 'facebook',
    label: 'Facebook',
    kind: 'named',
    match: ['facebook', 'fb.com']
  },
  {
    key: 'medium',
    label: 'Medium',
    kind: 'named',
    match: ['medium.com']
  },
  {
    key: 'devto',
    label: 'DEV',
    kind: 'named',
    match: ['dev.to']
  },
  {
    key: 'producthunt',
    label: 'Product Hunt',
    kind: 'named',
    match: ['producthunt']
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    kind: 'shared',
    match: ['whatsapp', 'wa.me']
  },
  {
    key: 'telegram',
    label: 'Telegram',
    kind: 'shared',
    match: ['telegram', 't.me']
  },
  {
    key: 'slack',
    label: 'Slack',
    kind: 'shared',
    match: ['slack']
  },
  {
    key: 'discord',
    label: 'Discord',
    kind: 'shared',
    match: ['discord']
  },
  {
    key: 'hoycerca',
    label: 'HoyCerca',
    kind: 'named',
    match: ['hoycerca']
  }
]

const CV_KEYS = ['cv', 'resume', 'curriculum', 'portfolio']
const EMAIL_KEYS = [
  'email',
  'mail',
  'newsletter',
  'outlook',
  'gmail',
  'mailchimp',
  'brevo'
]

function normalize(value: string | null | undefined) {
  return (value ?? '').trim().toLowerCase().slice(0, 60)
}

function matchRule(token: string) {
  if (!token) {
    return undefined
  }
  return RULES.find((rule) =>
    rule.match.some((m) => {
      // domains: exact host or subdomain; short tokens: exact;
      // long plain words: substring (utm_source=linkedin_post)
      if (m.includes('.')) {
        return token === m || token.endsWith(`.${m}`)
      }
      return m.length <= 3 ? token === m : token.includes(m)
    })
  )
}

// Only values from the whitelist above ever reach the UI,
// so arbitrary text in a URL can never be displayed.
export function detectSource(
  search: string,
  referrer: string,
  ownHost: string
): TrafficSource | null {
  const params = new URLSearchParams(search)
  const utm = normalize(
    params.get('utm_source') ??
      params.get('ref') ??
      params.get('source')
  )
  const medium = normalize(params.get('utm_medium'))

  if (CV_KEYS.includes(utm)) {
    return { kind: 'cv', label: 'CV', key: 'cv' }
  }
  if (
    EMAIL_KEYS.some((k) => utm.includes(k)) ||
    medium === 'email'
  ) {
    return { kind: 'email', label: 'Email', key: 'email' }
  }

  const fromUtm = matchRule(utm)
  if (fromUtm) {
    return {
      kind: fromUtm.kind,
      label: fromUtm.label,
      key: fromUtm.key
    }
  }

  let host = ''
  try {
    host = referrer
      ? new URL(referrer).hostname.toLowerCase()
      : ''
  } catch {
    host = ''
  }
  if (
    host &&
    host !== ownHost &&
    !host.endsWith(`.${ownHost}`)
  ) {
    const fromRef = matchRule(host)
    if (fromRef) {
      return {
        kind: fromRef.kind,
        label: fromRef.label,
        key: fromRef.key
      }
    }
  }

  return null
}
