import React from 'react'
import ReactMarkdown from 'react-markdown'
import { GitHubComment } from '../../../types'
import styles from './CommentItem.module.scss'

interface CommentItemProps {
  comment: GitHubComment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return '1天前'
    } else if (diffDays < 7) {
      return `${diffDays}天前`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks}周前`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months}个月前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  return (
    <div className={styles.commentItem}>
      <div className={styles.avatar}>
        <img 
          src={comment.user.avatar_url} 
          alt={comment.user.login}
          loading="lazy"
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <a 
              href={comment.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.username}
            >
              {comment.user.login}
            </a>
            {comment.author_association === 'OWNER' && (
              <span className={styles.badge}>作者</span>
            )}
          </div>
          
          <div className={styles.meta}>
            <time className={styles.date}>
              {formatDate(comment.created_at)}
            </time>
            {comment.updated_at !== comment.created_at && (
              <span className={styles.edited}>已编辑</span>
            )}
          </div>
        </div>
        
        <div className={styles.body}>
          <ReactMarkdown
            components={{
              // 简化的Markdown渲染，避免复杂的代码高亮
              code({ node, inline, className, children, ...props }) {
                return inline ? (
                  <code className={styles.inlineCode} {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className={styles.codeBlock}>
                    <code {...props}>{children}</code>
                  </pre>
                )
              },
              a({ href, children, ...props }) {
                return (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                )
              }
            }}
          >
            {comment.body}
          </ReactMarkdown>
        </div>
        
        <div className={styles.actions}>
          <a 
            href={comment.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.replyLink}
          >
            回复
          </a>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
