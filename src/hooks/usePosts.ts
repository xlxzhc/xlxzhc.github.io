import { useState, useEffect } from 'react'
import { PostMetadata, Post } from '../types'
import blogIndex from '../data/blog-index.json'
import { 
  parseMarkdown, 
  calculateReadTime, 
  generateExcerpt 
} from '../utils/markdown'

/**
 * 动态导入单个博客文章内容
 */
async function loadPostContent(slug: string): Promise<string | null> {
  try {
    // 动态导入 markdown 文件
    const module = await import(`../../blog/${slug}.md?raw`)
    return module.default
  } catch (error) {
    console.error(`Failed to load post: ${slug}`, error)
    return null
  }
}

/**
 * 将索引数据转换为 PostMetadata 格式
 */
function convertToPostMetadata(indexData: typeof blogIndex): PostMetadata[] {
  return indexData.map((post, index) => ({
    id: String(index + 1),
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags,
    author: post.author,
    readTime: post.readTime,
    featured: post.featured
  }))
}

/**
 * Hook: 获取所有博客文章列表
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<PostMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // 模拟异步加载(保持原有的用户体验)
        await new Promise(resolve => setTimeout(resolve, 300))
        const allPosts = convertToPostMetadata(blogIndex)
        setPosts(allPosts)
      } catch (error) {
        console.error('Failed to load posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return { posts, loading }
}

/**
 * Hook: 获取单篇博客文章详情
 */
export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // 模拟异步加载
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // 从索引中查找文章元数据
        const postMeta = blogIndex.find(p => p.slug === slug)
        
        if (!postMeta) {
          setNotFound(true)
          return
        }

        // 动态加载文章内容
        const rawContent = await loadPostContent(slug)
        
        if (!rawContent) {
          setNotFound(true)
          return
        }

        // 解析 markdown
        const { content: markdownContent } = parseMarkdown(rawContent)

        setPost({
          id: slug,
          title: postMeta.title,
          slug: postMeta.slug,
          excerpt: postMeta.excerpt,
          content: markdownContent,
          date: postMeta.date,
          tags: postMeta.tags,
          author: postMeta.author,
          readTime: postMeta.readTime,
          featured: postMeta.featured
        })
      } catch (error) {
        console.error('Failed to load post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  return { post, loading, notFound }
}
