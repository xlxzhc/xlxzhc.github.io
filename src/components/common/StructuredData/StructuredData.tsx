import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Post, PostMetadata } from '../../../types'

interface BlogStructuredDataProps {
  posts: PostMetadata[]
}

interface ArticleStructuredDataProps {
  post: Post
}

// 博客网站结构化数据
export const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({ posts }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "xlxzhc - 个人博客",
    "description": "xlxzhc的个人博客，分享技术文章和生活感悟",
    "url": "https://xlxzhc.github.io",
    "author": {
      "@type": "Person",
      "name": "xlxzhc",
      "url": "https://xlxzhc.github.io/about"
    },
    "publisher": {
      "@type": "Person",
      "name": "xlxzhc",
      "url": "https://xlxzhc.github.io"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://xlxzhc.github.io/post/${post.slug}`,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "keywords": post.tags.join(", ")
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

// 文章结构化数据
export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({ post }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://xlxzhc.github.io/logo.svg",
    "url": `https://xlxzhc.github.io/post/${post.slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://xlxzhc.github.io/about"
    },
    "publisher": {
      "@type": "Person",
      "name": "xlxzhc",
      "url": "https://xlxzhc.github.io",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xlxzhc.github.io/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://xlxzhc.github.io/post/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime}M`
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

// 网站结构化数据
export const WebsiteStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "xlxzhc - 个人博客",
    "description": "xlxzhc的个人博客，分享技术文章和生活感悟",
    "url": "https://xlxzhc.github.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://xlxzhc.github.io/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Person",
      "name": "xlxzhc",
      "url": "https://xlxzhc.github.io/about"
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
