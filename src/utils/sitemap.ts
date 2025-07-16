import { PostMetadata } from '../types'

export const generateSitemap = (posts: PostMetadata[]): string => {
  const baseUrl = 'https://xlxzhc.github.io'
  const currentDate = new Date().toISOString().split('T')[0]
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
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

export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

Sitemap: https://xlxzhc.github.io/sitemap.xml`
}
