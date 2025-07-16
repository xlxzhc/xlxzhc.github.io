import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { PostMetadata } from '../../types'
import { usePosts } from '../../hooks/usePosts'
import { usePageLoadPerformance } from '../../hooks/usePerformance'
import SearchBox from '../../components/blog/SearchBox/SearchBox'
import PostCard from '../../components/blog/PostCard/PostCard'
import Loading from '../../components/common/Loading/Loading'
import { BlogStructuredData, WebsiteStructuredData } from '../../components/common/StructuredData/StructuredData'
import styles from './Home.module.scss'

const Home: React.FC = () => {
  const { posts, loading } = usePosts()
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([])

  // 性能监控
  usePageLoadPerformance('Home')

  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  const handleSearch = (results: PostMetadata[]) => {
    setFilteredPosts(results)
  }

  if (loading) {
    return (
      <div className="container">
        <Loading message="正在加载文章..." />
      </div>
    )
  }

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <>
      <Helmet>
        <title>xlxzhc - 个人博客</title>
        <meta name="description" content="xlxzhc的个人博客，分享技术文章和生活感悟" />
        <meta name="keywords" content="博客,技术,编程,前端,React,TypeScript,JavaScript" />
        <meta property="og:title" content="xlxzhc - 个人博客" />
        <meta property="og:description" content="xlxzhc的个人博客，分享技术文章和生活感悟" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xlxzhc.github.io" />
        <meta property="og:image" content="https://xlxzhc.github.io/logo.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="xlxzhc - 个人博客" />
        <meta name="twitter:description" content="xlxzhc的个人博客，分享技术文章和生活感悟" />
        <link rel="canonical" href="https://xlxzhc.github.io" />
      </Helmet>

      <WebsiteStructuredData />
      <BlogStructuredData posts={posts} />

      <div className="container">
        <section className={styles.hero}>
          <h1>欢迎来到我的博客</h1>
          <p>分享技术文章、编程经验和生活感悟</p>
        </section>

        <section className={styles.searchSection}>
          <SearchBox posts={posts} onSearch={handleSearch} />
        </section>

        {featuredPosts.length > 0 && (
          <section className={styles.featuredSection}>
            <h2>精选文章</h2>
            <div className={styles.featuredGrid}>
              {featuredPosts.map(post => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
          </section>
        )}

        <section className={styles.postsSection}>
          <h2>最新文章</h2>
          {regularPosts.length > 0 ? (
            <div className={styles.postsGrid}>
              {regularPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className={styles.noPosts}>暂无文章</p>
          )}
        </section>
      </div>
    </>
  )
}

export default Home
