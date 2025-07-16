import React, { useState } from 'react'
import styles from './CommentForm.module.scss'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  onCancel: () => void
  issueUrl?: string
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, onCancel, issueUrl }) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('请输入评论内容')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit(content.trim())
      setContent('')
      onCancel() // 关闭表单
    } catch (err) {
      setError(err instanceof Error ? err.message : '发表评论失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.commentForm}>
      <div className={styles.notice}>
        <p>
          💡 评论将发布到 GitHub Issues。您需要先登录 GitHub 账号。
          {issueUrl && (
            <>
              {' '}或者直接在{' '}
              <a href={issueUrl} target="_blank" rel="noopener noreferrer">
                GitHub 上评论
              </a>
            </>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="comment-content">评论内容</label>
          <textarea
            id="comment-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="支持 Markdown 语法..."
            rows={6}
            disabled={isSubmitting}
            className={styles.textarea}
          />
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={styles.cancelButton}
          >
            取消
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={styles.submitButton}
          >
            {isSubmitting ? '发表中...' : '发表评论'}
          </button>
        </div>
      </form>

      <div className={styles.help}>
        <details>
          <summary>Markdown 语法帮助</summary>
          <div className={styles.helpContent}>
            <ul>
              <li><code>**粗体**</code> → <strong>粗体</strong></li>
              <li><code>*斜体*</code> → <em>斜体</em></li>
              <li><code>`代码`</code> → <code>代码</code></li>
              <li><code>[链接](URL)</code> → 链接</li>
              <li><code>- 列表项</code> → 无序列表</li>
              <li><code>&gt; 引用</code> → 引用块</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  )
}

export default CommentForm
