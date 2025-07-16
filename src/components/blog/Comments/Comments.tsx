import React, { useState, useEffect } from 'react'
import { Post } from '../../../types'
import { useGitHubComments } from '../../../hooks/useGitHubComments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import Loading from '../../common/Loading/Loading'
import styles from './Comments.module.scss'

interface CommentsProps {
  post: Post
}

const Comments: React.FC<CommentsProps> = ({ post }) => {
  const { 
    comments, 
    loading, 
    error, 
    issueUrl,
    createComment,
    refreshComments 
  } = useGitHubComments(post.slug)

  const [showCommentForm, setShowCommentForm] = useState(false)

  if (loading) {
    return (
      <div className={styles.comments}>
        <h3>评论</h3>
        <Loading message="加载评论中..." size="small" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.comments}>
        <h3>评论</h3>
        <div className={styles.error}>
          <p>评论加载失败: {error}</p>
          <button onClick={refreshComments} className={styles.retryButton}>
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h3>评论 ({comments.length})</h3>
        <div className={styles.actions}>
          {issueUrl && (
            <a 
              href={issueUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              在 GitHub 上查看讨论
            </a>
          )}
        </div>
      </div>

      {comments.length === 0 ? (
        <div className={styles.noComments}>
          <p>还没有评论，来发表第一个评论吧！</p>
        </div>
      ) : (
        <div className={styles.commentsList}>
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      <div className={styles.commentFormSection}>
        {!showCommentForm ? (
          <button 
            onClick={() => setShowCommentForm(true)}
            className={styles.showFormButton}
          >
            💬 发表评论
          </button>
        ) : (
          <CommentForm 
            onSubmit={createComment}
            onCancel={() => setShowCommentForm(false)}
            issueUrl={issueUrl}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p>
          评论功能基于 GitHub Issues 实现。
          您需要 <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub 账号</a> 来发表评论。
        </p>
      </div>
    </div>
  )
}

export default Comments
