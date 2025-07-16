export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  author: string
  readTime: number
  featured?: boolean
}

export interface PostMetadata {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  tags: string[]
  author: string
  readTime: number
  featured?: boolean
}

export interface Theme {
  mode: 'light' | 'dark'
}

export interface SearchResult {
  item: PostMetadata
  score: number
}

// GitHub Issues 评论相关类型
export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

export interface GitHubComment {
  id: number
  body: string
  user: GitHubUser
  created_at: string
  updated_at: string
  html_url: string
  author_association: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string
  html_url: string
  state: 'open' | 'closed'
  comments: number
  created_at: string
  updated_at: string
}
