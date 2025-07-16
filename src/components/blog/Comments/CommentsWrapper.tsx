import React, { useState, useEffect } from 'react'
import { Post } from '../../../types'
import GiscusComments from './GiscusComments'
import Comments from './Comments'
import { validateGiscusConfig, defaultGiscusConfig } from '../../../config/giscus'
import styles from './CommentsWrapper.module.scss'

interface CommentsWrapperProps {
  post: Post
}

type CommentSystem = 'giscus' | 'github-issues'

const CommentsWrapper: React.FC<CommentsWrapperProps> = ({ post }) => {
  const [commentSystem, setCommentSystem] = useState<CommentSystem>('giscus')
  const [showSystemSelector, setShowSystemSelector] = useState(false)

  // 检查Giscus配置是否可用
  const isGiscusAvailable = validateGiscusConfig(defaultGiscusConfig)

  // 如果Giscus不可用，自动切换到GitHub Issues
  useEffect(() => {
    if (!isGiscusAvailable) {
      setCommentSystem('github-issues')
      setShowSystemSelector(true)
    }
  }, [isGiscusAvailable])

  const handleSystemChange = (system: CommentSystem) => {
    setCommentSystem(system)
    // 保存用户偏好
    localStorage.setItem('preferred-comment-system', system)
  }

  // 加载用户偏好
  useEffect(() => {
    const saved = localStorage.getItem('preferred-comment-system') as CommentSystem
    if (saved && (saved === 'giscus' || saved === 'github-issues')) {
      if (saved === 'giscus' && isGiscusAvailable) {
        setCommentSystem('giscus')
      } else {
        setCommentSystem('github-issues')
      }
    }
  }, [isGiscusAvailable])

  return (
    <div className={styles.commentsWrapper}>
      {/* 评论系统选择器 */}
      {(showSystemSelector || isGiscusAvailable) && (
        <div className={styles.systemSelector}>
          <div className={styles.selectorHeader}>
            <span>评论系统：</span>
            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleButton} ${commentSystem === 'giscus' ? styles.active : ''}`}
                onClick={() => handleSystemChange('giscus')}
                disabled={!isGiscusAvailable}
                title={isGiscusAvailable ? '无感评论体验' : 'Giscus配置不完整'}
              >
                💬 Giscus
              </button>
              <button
                className={`${styles.toggleButton} ${commentSystem === 'github-issues' ? styles.active : ''}`}
                onClick={() => handleSystemChange('github-issues')}
                title="基于GitHub Issues"
              >
                🔗 GitHub Issues
              </button>
            </div>
          </div>
          
          <div className={styles.systemInfo}>
            {commentSystem === 'giscus' ? (
              <p>
                <span className={styles.badge}>推荐</span>
                无需跳转，直接在页面内评论讨论
              </p>
            ) : (
              <p>
                <span className={styles.badge}>传统</span>
                跳转到GitHub进行评论和讨论
              </p>
            )}
          </div>
        </div>
      )}

      {/* 渲染对应的评论组件 */}
      {commentSystem === 'giscus' ? (
        <GiscusComments post={post} />
      ) : (
        <Comments post={post} />
      )}

      {/* 配置提示 */}
      {!isGiscusAvailable && commentSystem === 'giscus' && (
        <div className={styles.configNotice}>
          <h4>🔧 Giscus配置提示</h4>
          <p>要启用无感评论体验，需要完成以下配置：</p>
          <ol>
            <li>在GitHub仓库中启用Discussions功能</li>
            <li>安装Giscus GitHub App</li>
            <li>获取并配置repo-id和category-id</li>
          </ol>
          <p>
            详细配置指南请查看控制台输出或访问{' '}
            <a href="https://giscus.app/zh-CN" target="_blank" rel="noopener noreferrer">
              giscus.app
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default CommentsWrapper
