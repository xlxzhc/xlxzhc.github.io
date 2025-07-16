import { PostMetadata } from '../types'

export const generateRSSFeed = (posts: PostMetadata[]): string => {
  const baseUrl = 'https://xlxzhc.github.io'
  const currentDate = new Date().toUTCString()
  
  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20) // 只包含最新的20篇文章
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

export const generateAtomFeed = (posts: PostMetadata[]): string => {
  const baseUrl = 'https://xlxzhc.github.io'
  const currentDate = new Date().toISOString()
  
  const atomEntries = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)
    .map(post => {
      const postUrl = `${baseUrl}/post/${post.slug}`
      const publishedDate = new Date(post.date).toISOString()
      
      return `  <entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${postUrl}"/>
    <updated>${publishedDate}</updated>
    <id>${postUrl}</id>
    <content type="html"><![CDATA[${post.excerpt}]]></content>
    <author>
      <name>xlxzhc</name>
    </author>
    ${post.tags.map(tag => `<category term="${tag}"/>`).join('\n    ')}
  </entry>`
    }).join('\n')

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>xlxzhc - 个人博客</title>
  <link href="${baseUrl}"/>
  <updated>${currentDate}</updated>
  <author>
    <name>xlxzhc</name>
  </author>
  <id>${baseUrl}/</id>
  <subtitle>xlxzhc的个人博客，分享技术文章和生活感悟</subtitle>
${atomEntries}
</feed>`
}
