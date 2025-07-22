import fs from 'fs'
import path from 'path'

// 模拟文章数据 - 在实际项目中，这应该从数据源读取
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
  },
  {
    id: '4',
    title: '微信链接重定向绕过插件：Fiddler插件开发实战',
    slug: 'weixin-redirect-bypass-fiddler-plugin',
    excerpt: '深入解析微信链接拦截机制，使用Fiddler插件技术实现自动绕过，包含HTTP拦截、URL提取、JavaScript注入等核心技术实现。',
    date: '2025-01-22',
    tags: ['Fiddler', 'C#', 'HTTP代理', '插件开发', '微信'],
    author: 'xlxzhc',
    readTime: 15
  }
]

const generateSitemap = (posts) => {
  const baseUrl = 'https://xlxzhc.github.io'
  const currentDate = new Date().toISOString().split('T')[0]
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
  ]
  
  const postPages = posts.map(post => ({
    url: `/post/${post.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: post.date
  }))
  
  const allPages = [...staticPages, ...postPages]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  return sitemap
}

// 生成sitemap.xml
const sitemap = generateSitemap(posts)
const distPath = path.join(process.cwd(), 'dist')

// 确保dist目录存在
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true })
}

// 写入sitemap.xml
fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap)

// 生成RSS feed
const generateRSSFeed = (posts) => {
  const baseUrl = 'https://xlxzhc.github.io'
  const currentDate = new Date().toUTCString()

  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)
    .map(post => {
      const postUrl = `${baseUrl}/post/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>xlxzhc</author>
      <category><![CDATA[${post.tags.join(', ')}]]></category>
    </item>`
    }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>xlxzhc - 个人博客</title>
    <description>xlxzhc的个人博客，分享技术文章和生活感悟</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>xlxzhc - 个人博客</title>
      <link>${baseUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`
}

// 生成并写入RSS feed
const rssContent = generateRSSFeed(posts)
fs.writeFileSync(path.join(distPath, 'rss.xml'), rssContent)

console.log('✅ Sitemap and RSS feed generated successfully!')
