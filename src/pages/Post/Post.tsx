import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { usePost } from '../../hooks/usePosts'
import Loading from '../../components/common/Loading/Loading'
import { ArticleStructuredData } from '../../components/common/StructuredData/StructuredData'
import CommentsWrapper from '../../components/blog/Comments/CommentsWrapper'
import styles from './Post.module.scss'

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, notFound } = usePost(slug || '')



  if (loading) {
    return (
      <div className="container">
        <Loading message="正在加载文章..." />
      </div>
    )
  }

  if (notFound || !post) {
    return <Navigate to="/" replace />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - xlxzhc</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={`${post.title} - xlxzhc`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://xlxzhc.github.io/post/${post.slug}`} />
        <meta property="og:image" content="https://xlxzhc.github.io/logo.svg" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${post.title} - xlxzhc`} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={`https://xlxzhc.github.io/post/${post.slug}`} />
      </Helmet>

      <ArticleStructuredData post={post} />

      <article className={styles.post}>
        <div className="container">
          <header className={styles.postHeader}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <time className={styles.date}>{formatDate(post.date)}</time>
              <span className={styles.readTime}>{post.readTime} 分钟阅读</span>
              <span className={styles.author}>作者: {post.author}</span>
            </div>
            <div className={styles.tags}>
              {post.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className={styles.content}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow as any}
                      language={match[1]}
                      PreTag="div"
                      {...(props as any)}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <CommentsWrapper post={post} />
        </div>
      </article>
    </>
  )
}

export default Post
