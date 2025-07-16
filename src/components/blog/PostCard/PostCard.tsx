import React from 'react'
import { Link } from 'react-router-dom'
import { PostMetadata } from '../../../types'
import styles from './PostCard.module.scss'
import clsx from 'clsx'

interface PostCardProps {
  post: PostMetadata
  featured?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={clsx(styles.postCard, { [styles.featured]: featured })}>
      <Link to={`/post/${post.slug}`} className={styles.cardLink}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.meta}>
              <time className={styles.date}>{formatDate(post.date)}</time>
              <span className={styles.readTime}>{post.readTime} 分钟阅读</span>
            </div>
          </div>
          
          <p className={styles.excerpt}>{post.excerpt}</p>
          
          <div className={styles.cardFooter}>
            <div className={styles.tags}>
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className={styles.moreTag}>+{post.tags.length - 3}</span>
              )}
            </div>
            
            <span className={styles.readMore}>阅读更多 →</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostCard
