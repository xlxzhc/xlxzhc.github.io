import { useState, useEffect } from 'react'
import { PostMetadata, Post } from '../types'

// 模拟文章数据 - 在实际项目中，这应该从API或静态文件加载
const mockPosts: PostMetadata[] = [
  {
    id: '1',
    title: '欢迎来到我的博客',
    slug: 'welcome-to-my-blog',
    excerpt: '这是我的第一篇博客文章，介绍了这个网站的技术栈和未来规划。',
    date: '2025-01-15',
    tags: ['博客', '介绍', 'React'],
    author: 'xlxzhc',
    readTime: 3,
    featured: true
  },
  {
    id: '2',
    title: 'React + TypeScript 最佳实践',
    slug: 'react-typescript-best-practices',
    excerpt: '分享在React项目中使用TypeScript的最佳实践和常见陷阱。',
    date: '2025-01-10',
    tags: ['React', 'TypeScript', '前端'],
    author: 'xlxzhc',
    readTime: 8
  },
  {
    id: '3',
    title: 'Vite 构建工具深度解析',
    slug: 'vite-build-tool-deep-dive',
    excerpt: '深入了解Vite的工作原理，以及如何优化构建性能。',
    date: '2025-01-05',
    tags: ['Vite', '构建工具', '性能优化'],
    author: 'xlxzhc',
    readTime: 12
  }
]

const mockPostContent: Record<string, string> = {
  'welcome-to-my-blog': `# 欢迎来到我的博客

这是我的第一篇博客文章！在这里，我想和大家分享一下这个网站的技术栈和未来的规划。

## 技术栈

这个博客使用了以下技术：

- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **SCSS** - 强大的CSS预处理器
- **GitHub Pages** - 免费的静态网站托管

## 功能特性

### 🎨 现代化设计
- 响应式布局，完美适配各种设备
- 暗黑/明亮主题切换
- 流畅的动画效果

### 🔍 强大的搜索
- 基于Fuse.js的模糊搜索
- 支持标题、内容、标签搜索

### 📝 Markdown支持
- 完整的Markdown语法支持
- 代码高亮显示
- 数学公式渲染（计划中）

## 代码示例

\`\`\`typescript
interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  tags: string[]
}

const createPost = (data: BlogPost): BlogPost => {
  return {
    ...data,
    date: new Date().toISOString()
  }
}
\`\`\`

## 未来规划

1. **评论系统** - 集成第三方评论服务
2. **RSS订阅** - 自动生成RSS feed
3. **文章分类** - 按分类组织文章
4. **全文搜索** - 更强大的搜索功能
5. **性能优化** - 图片懒加载、代码分割等

感谢您的访问，希望这个博客能为您带来有价值的内容！`,

  'react-typescript-best-practices': `# React + TypeScript 最佳实践

在现代前端开发中，React 和 TypeScript 的组合已经成为了主流选择。本文将分享一些在实际项目中总结的最佳实践。

## 组件类型定义

### 函数组件
\`\`\`typescript
interface Props {
  title: string
  count?: number
  onUpdate: (value: number) => void
}

const MyComponent: React.FC<Props> = ({ title, count = 0, onUpdate }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => onUpdate(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
\`\`\`

## Hooks 类型安全

### useState
\`\`\`typescript
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState<boolean>(false)
\`\`\`

### useEffect
\`\`\`typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.getUser()
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }
  
  fetchData()
}, [])
\`\`\`

## 常见陷阱

1. **避免使用 any**
2. **正确处理事件类型**
3. **合理使用泛型**

这些实践能帮助你写出更安全、更易维护的代码。`,

  'vite-build-tool-deep-dive': `# Vite 构建工具深度解析

Vite 是一个现代化的前端构建工具，它利用了 ES modules 和现代浏览器的能力来提供极快的开发体验。

## 核心特性

### 极速的冷启动
- 利用 ES modules 的原生支持
- 按需编译，只处理当前页面需要的模块

### 热模块替换 (HMR)
- 精确的模块级别更新
- 保持应用状态

### 优化的构建
- 基于 Rollup 的生产构建
- 代码分割和懒加载支持

## 配置示例

\`\`\`typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns']
        }
      }
    }
  }
})
\`\`\`

## 性能优化技巧

1. **代码分割**
2. **资源预加载**
3. **构建缓存**

Vite 的这些特性让前端开发变得更加高效和愉快。`
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟异步加载
    const loadPosts = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        setPosts(mockPosts)
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

export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const postMeta = mockPosts.find(p => p.slug === slug)
        const content = mockPostContent[slug]
        
        if (postMeta && content) {
          setPost({
            ...postMeta,
            content
          })
        } else {
          setNotFound(true)
        }
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
