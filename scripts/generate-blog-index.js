/**
 * 生成博客索引文件
 * 扫描 blog 目录下的所有 .md 文件,解析 frontmatter 并生成索引
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BLOG_DIR = path.join(__dirname, '../blog')
const OUTPUT_FILE = path.join(__dirname, '../src/data/blog-index.json')

/**
 * 解析 frontmatter
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return null

  const frontmatter = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    if (!line.trim() || line.startsWith('#')) continue

    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    // 移除引号
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // 解析数组
    if (key === 'tags') {
      const arrayMatch = value.match(/\[(.*?)\]/)
      if (arrayMatch) {
        frontmatter[key] = arrayMatch[1]
          .split(',')
          .map(tag => tag.trim().replace(/['"]/g, ''))
          .filter(tag => tag)
      }
    }
    // 解析布尔值
    else if (value === 'true' || value === 'false') {
      frontmatter[key] = value === 'true'
    }
    // 解析数字
    else if (!isNaN(Number(value)) && value !== '') {
      frontmatter[key] = Number(value)
    }
    // 字符串
    else {
      frontmatter[key] = value
    }
  }

  return frontmatter
}

/**
 * 计算阅读时间
 */
function calculateReadTime(content) {
  const textContent = content.replace(/```[\s\S]*?```/g, '')
  const chineseChars = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (textContent.match(/[a-zA-Z]+/g) || []).length
  return Math.max(1, Math.ceil((chineseChars / 300) + (englishWords / 200)))
}

/**
 * 生成摘要
 */
function generateExcerpt(content, maxLength = 150) {
  let text = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .trim()

  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...'
  }
  return text
}

/**
 * 生成博客索引
 */
function generateBlogIndex() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.md') && file !== 'README.md')
  const posts = []

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const frontmatter = parseFrontmatter(content)

    if (!frontmatter) {
      console.warn(`Warning: Failed to parse frontmatter in ${file}`)
      continue
    }

    // 移除 frontmatter 获取正文
    const markdownContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    
    const slug = file.replace(/\.md$/, '')
    const readTime = frontmatter.readTime || calculateReadTime(markdownContent)
    const excerpt = frontmatter.excerpt || frontmatter.description || generateExcerpt(markdownContent)

    posts.push({
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      author: frontmatter.author,
      tags: frontmatter.tags || [],
      category: frontmatter.category,
      description: frontmatter.description,
      excerpt,
      readTime,
      featured: frontmatter.featured || false
    })
  }

  // 按日期降序排序
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  // 确保输出目录存在
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 写入文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8')
  
  console.log(`✅ Generated blog index with ${posts.length} posts`)
  console.log(`📝 Output: ${OUTPUT_FILE}`)
}

// 执行
generateBlogIndex()