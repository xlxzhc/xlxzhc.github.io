// 为博客文章创建对应的 GitHub Issues 用于评论
// 使用方法: node scripts/create-comment-issues.js

import fs from 'fs'
import path from 'path'

// GitHub 配置
const GITHUB_CONFIG = {
  owner: 'xlxzhc',
  repo: 'xlxzhc.github.io',
  token: process.env.GITHUB_TOKEN // 需要设置环境变量
}

// 文章数据
const posts = [
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

// 生成 Issue 标题和内容
const generateIssueData = (post) => {
  const title = `Comments for: ${post.slug}`
  const body = `# ${post.title}

${post.excerpt}

**文章链接**: https://xlxzhc.github.io/post/${post.slug}
**发布日期**: ${post.date}
**标签**: ${post.tags.join(', ')}
**预计阅读时间**: ${post.readTime} 分钟

---

欢迎在此讨论这篇文章！请保持友善和建设性的交流。

> 这个 Issue 是自动创建的，用于收集博客文章的评论和讨论。`

  return { title, body }
}

// 创建 GitHub Issue
const createIssue = async (post) => {
  if (!GITHUB_CONFIG.token) {
    console.error('请设置 GITHUB_TOKEN 环境变量')
    return null
  }

  const { title, body } = generateIssueData(post)
  
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        title,
        body,
        labels: ['blog-comments', 'discussion']
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`创建 Issue 失败: ${error.message}`)
    }

    const issue = await response.json()
    console.log(`✅ 为文章 "${post.title}" 创建了 Issue #${issue.number}`)
    return issue
  } catch (error) {
    console.error(`❌ 创建 Issue 失败 (${post.title}):`, error.message)
    return null
  }
}

// 检查 Issue 是否已存在
const checkExistingIssue = async (post) => {
  const title = `Comments for: ${post.slug}`
  
  try {
    const searchUrl = `https://api.github.com/search/issues?q=repo:${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}+in:title+"${encodeURIComponent(title)}"`
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error('搜索失败')
    }

    const data = await response.json()
    return data.items && data.items.length > 0 ? data.items[0] : null
  } catch (error) {
    console.error(`检查现有 Issue 失败 (${post.title}):`, error.message)
    return null
  }
}

// 主函数
const main = async () => {
  console.log('🚀 开始为博客文章创建评论 Issues...\n')

  if (!GITHUB_CONFIG.token) {
    console.log('💡 使用说明:')
    console.log('1. 在 GitHub 创建一个 Personal Access Token')
    console.log('2. 设置环境变量: export GITHUB_TOKEN=your_token')
    console.log('3. 重新运行此脚本')
    console.log('\n或者手动在 GitHub 上为每篇文章创建对应的 Issue')
    return
  }

  for (const post of posts) {
    console.log(`处理文章: ${post.title}`)
    
    // 检查是否已存在
    const existing = await checkExistingIssue(post)
    if (existing) {
      console.log(`⏭️  Issue 已存在: #${existing.number}`)
      continue
    }

    // 创建新 Issue
    await createIssue(post)
    
    // 避免 API 限制，添加延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n✨ 完成！')
  console.log('\n📝 手动创建 Issue 的步骤:')
  console.log('1. 访问: https://github.com/xlxzhc/xlxzhc.github.io/issues/new')
  console.log('2. 使用标题格式: "Comments for: [文章slug]"')
  console.log('3. 添加标签: blog-comments, discussion')
}

// 运行脚本
main().catch(console.error)
