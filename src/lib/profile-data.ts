export interface PortfolioProject {
  slug: string
  title: string
  summary: string
  impact: string
  stack: string[]
  href?: string
}

export const profileFacts = {
  name: 'Bill Gaize',
  role: 'Full Stack MERN Developer',
  bio: 'I build practical web products, Shopify integrations, and AI-assisted workflows with a strong foundation in Medical Laboratory Science.',
  location: 'Remote, open to global collaboration',
  contactEmail: 'me@billgaize.com',
  calendly: 'https://calendly.com/me--52uo/30min',
  linkedin: 'https://www.linkedin.com/in/billgaize/'
}

export const coreServices = [
  'Full stack product development',
  'Shopify integrations and automation',
  'Internal tools and operations workflows',
  'API architecture and third-party integrations',
  'Technical writing and developer education'
]

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'shopify-ops-suite',
    title: 'Shopify Ops Suite',
    summary:
      'A custom operations dashboard to centralize orders, fulfillment status, and support workflows.',
    impact:
      'Reduced manual order handling time by 42% through workflow automation and API orchestration.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Shopify API']
  },
  {
    slug: 'clinical-insights-pipeline',
    title: 'Clinical Insights Pipeline',
    summary:
      'Data pipeline and analytics UI for turning raw laboratory events into reporting-ready metrics.',
    impact:
      'Improved reporting accuracy and cut processing delays from days to near real-time updates.',
    stack: ['Python', 'FastAPI', 'React', 'D3.js', 'Docker']
  },
  {
    slug: 'content-workbench-ai',
    title: 'Content Workbench AI',
    summary:
      'A writing assistant for drafting, refining, and publishing long-form technical content with controlled tone.',
    impact:
      'Enabled fast editorial workflows while preserving consistent voice and SEO structure.',
    stack: ['OpenAI API', 'Next.js', 'Tailwind CSS', 'Redis', 'Vercel']
  },
  {
    slug: 'portfolio-redesign-system',
    title: 'Portfolio Redesign System',
    summary:
      'A minimalist portfolio architecture inspired by Notion, focused on readability and professional storytelling.',
    impact:
      'Created a clearer narrative for recruiters and clients with stronger UX consistency across pages.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  }
]

export const quickAnswers = [
  {
    id: 'background',
    keywords: ['who', 'background', 'about', 'experience', 'bio'],
    answer:
      'Bill is a Full Stack MERN Developer with a Medical Laboratory Science background. He combines technical depth with process-oriented thinking to build reliable software.'
  },
  {
    id: 'services',
    keywords: ['service', 'offer', 'help', 'work', 'hire'],
    answer:
      'He helps with full-stack products, Shopify integrations, internal tools, API architecture, and AI-assisted workflows for teams that need practical outcomes.'
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'book', 'call', 'meeting'],
    answer:
      'You can reach Bill at me@billgaize.com or book a call at calendly.com/me--52uo/30min.'
  }
]
