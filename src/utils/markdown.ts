/**
 * Markdown 文件解析工具
 * 用于解析博客文章的 frontmatter 和内容
 */

export interface MarkdownFrontmatter {
  title: string
  date: string
  author: string
  tags: string[]
  category?: string
  description?: string
  excerpt?: string
  featured?: boolean
  readTime?: number
}

export interface ParsedMarkdown {
  frontmatter: MarkdownFrontmatter
  content: string
}

/**
 * 解析 Markdown 文件的 frontmatter 和内容
 * @param raw 原始 Markdown 文本
 * @returns 解析后的 frontmatter 和内容
 */
export function parseMarkdown(raw: string): ParsedMarkdown {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = raw.match(frontmatterRegex)

  if (!match) {
    throw new Error('Invalid markdown file: missing frontmatter')
  }

  const [, frontmatterStr, content] = match
  const frontmatter = parseFrontmatter(frontmatterStr)

  return {
    frontmatter,
    content: content.trim()
  }
}

/**
 * 解析 YAML frontmatter
 * @param yamlStr YAML 字符串
 * @returns 解析后的对象
 */
function parseFrontmatter(yamlStr: string): MarkdownFrontmatter {
  const lines = yamlStr.trim().split('\n')
  const result: any = {}

  for (const line of lines) {
    // 跳过空行和注释
    if (!line.trim() || line.trim().startsWith('#')) {
      continue
    }

    // 解析键值对
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    // 移除引号
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // 解析数组 (tags)
    if (key === 'tags') {
      // 支持 ["tag1", "tag2"] 或 [tag1, tag2] 格式
      const arrayMatch = value.match(/\[(.*?)\]/)
      if (arrayMatch) {
        result[key] = arrayMatch[1]
          .split(',')
          .map(tag => tag.trim().replace(/['"]/g, ''))
          .filter(tag => tag)
      } else {
        result[key] = []
      }
    }
    // 解析布尔值
    else if (value === 'true' || value === 'false') {
      result[key] = value === 'true'
    }
    // 解析数字
    else if (!isNaN(Number(value)) && value !== '') {
      result[key] = Number(value)
    }
    // 字符串
    else {
      result[key] = value
    }
  }

  return result as MarkdownFrontmatter
}

/**
 * 从文件路径生成 slug
 * @param filePath 文件路径
 * @returns slug
 */
export function generateSlugFromPath(filePath: string): string {
  // 从路径中提取文件名，去掉扩展名
  const fileName = filePath.split('/').pop()?.replace(/\.md$/, '') || ''
  return fileName
}

/**
 * 计算阅读时间（分钟）
 * @param content 文章内容
 * @returns 阅读时间（分钟）
 */
export function calculateReadTime(content: string): number {
  // 移除代码块
  const textContent = content.replace(/```[\s\S]*?```/g, '')
  
  // 计算字数（中文按字符，英文按单词）
  const chineseChars = (textContent.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (textContent.match(/[a-zA-Z]+/g) || []).length
  
  // 中文 300字/分钟，英文 200词/分钟
  const minutes = Math.ceil((chineseChars / 300) + (englishWords / 200))
  
  return Math.max(1, minutes) // 至少1分钟
}

/**
 * 生成文章摘要
 * @param content 文章内容
 * @param maxLength 最大长度
 * @returns 摘要
 */
export function generateExcerpt(content: string, maxLength: number = 150): string {
  // 移除 Markdown 标记
  let text = content
    .replace(/^#{1,6}\s+/gm, '') // 标题
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 粗体
    .replace(/\*([^*]+)\*/g, '$1') // 斜体
    .replace(/`([^`]+)`/g, '$1') // 行内代码
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 图片
    .replace(/^\s*[-*+]\s+/gm, '') // 列表
    .replace(/^\s*\d+\.\s+/gm, '') // 有序列表
    .replace(/^\s*>\s+/gm, '') // 引用
    .trim()

  // 截取指定长度
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...'
  }

  return text
}