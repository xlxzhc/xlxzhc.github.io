import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { Post } from '../../../types'
import { defaultGiscusConfig, generateGiscusAttributes, validateGiscusConfig, GISCUS_SETUP_GUIDE } from '../../../config/giscus'
import styles from './GiscusComments.module.scss'

interface GiscusCommentsProps {
  post: Post
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({ post }) => {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 根据主题选择Giscus主题
  const getGiscusTheme = () => {
    return theme.mode === 'dark' ? 'dark' : 'light'
  }

  // 检查配置是否完整
  const isConfigValid = validateGiscusConfig(defaultGiscusConfig)

  // 加载Giscus脚本
  const loadGiscus = () => {
    if (!containerRef.current) return

    // 检查配置
    if (!isConfigValid) {
      setError('Giscus配置不完整，请查看控制台获取配置指南')
      console.warn(GISCUS_SETUP_GUIDE)
      return
    }

    try {
      // 清除现有内容
      containerRef.current.innerHTML = ''

      // 创建script元素
      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'

      // 使用配置生成属性
      const attributes = generateGiscusAttributes(defaultGiscusConfig, theme.mode)
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value)
      })

      script.crossOrigin = 'anonymous'
      script.async = true

      script.onload = () => {
        setIsLoaded(true)
        setError(null)
      }

      script.onerror = () => {
        setError('评论系统加载失败，请检查网络连接')
        setIsLoaded(false)
      }

      containerRef.current.appendChild(script)
    } catch (err) {
      setError('评论系统初始化失败')
      console.error('Giscus load error:', err)
    }
  }

  // 更新主题
  const updateTheme = () => {
    const iframe = containerRef.current?.querySelector('iframe')
    if (iframe) {
      const message = {
        type: 'set-theme',
        theme: getGiscusTheme()
      }
      iframe.contentWindow?.postMessage({ giscus: message }, 'https://giscus.app')
    }
  }

  // 初始加载
  useEffect(() => {
    const timer = setTimeout(() => {
      loadGiscus()
    }, 100) // 延迟加载，确保DOM已准备好

    return () => clearTimeout(timer)
  }, [post.slug])

  // 主题变化时更新
  useEffect(() => {
    if (isLoaded) {
      updateTheme()
    }
  }, [theme.mode, isLoaded])

  return (
    <div className={styles.giscusComments}>
      <div className={styles.header}>
        <h3>评论讨论</h3>
        <div className={styles.info}>
          <span>💬 基于 GitHub Discussions</span>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={loadGiscus} className={styles.retryButton}>
            重试
          </button>
        </div>
      )}

      <div 
        ref={containerRef} 
        className={styles.giscusContainer}
        data-theme={theme.mode}
      />

      {!isLoaded && !error && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>加载评论中...</p>
        </div>
      )}

      <div className={styles.footer}>
        <p>
          💡 使用 GitHub 账号即可参与讨论。支持 Markdown 语法、表情反应和回复功能。
        </p>
      </div>
    </div>
  )
}

export default GiscusComments
