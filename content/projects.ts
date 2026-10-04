export type Project = {
  slug: string
  title: string
  summary: string
  stack: string[]
  year: number
  repo?: string
  live?: string
  /** Path under /public, e.g. '/projects/paper-mind.png' */
  image?: string
  featured?: boolean
}

// Order here is the order shown on the site.
export const projects: Project[] = [
  {
    slug: 'tide-tracker',
    title: 'Tide Tracker',
    summary:
      'Tracks foreign capital flowing through the Colombo Stock Exchange — every buy, every sell, every pattern.',
    stack: ['TypeScript', 'Python'],
    year: 2026,
    repo: 'https://github.com/hasindu-s/tide-tracker',
    featured: true,
  },
  {
    slug: 'paper-mind',
    title: 'PaperMind',
    summary:
      'A local RAG system for querying large documents using hybrid search and neural reranking.',
    stack: ['Python', 'RAG', 'LLMs'],
    year: 2026,
    repo: 'https://github.com/hasindu-s/paper-mind',
    featured: true,
  },
  {
    slug: 'restaurant-api',
    title: 'Restaurant API',
    summary:
      'A RESTful restaurant management API built with .NET and Clean Architecture for scalable, maintainable services.',
    stack: ['C#', '.NET', 'Clean Architecture'],
    year: 2025,
    repo: 'https://github.com/hasindu-s/restaurant-api-clean-architecture',
  },
  {
    slug: 'bitcoin-sentiment',
    title: 'Bitcoin Sentiment',
    summary:
      'Final-year project: sentiment analysis of Twitter to predict Bitcoin prices.',
    stack: ['Python', 'NLP', 'ML'],
    year: 2023,
    repo: 'https://github.com/hasindu-s/fyp',
  },
  {
    slug: 'surgery-duration-prediction',
    title: 'Surgery Duration Prediction',
    summary:
      'Predicts arthroplasty knee surgery duration using a random forest classifier and statistical methods.',
    stack: ['Python', 'scikit-learn'],
    year: 2022,
    repo: 'https://github.com/hasindu-s/surgery-duration-prediction',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
