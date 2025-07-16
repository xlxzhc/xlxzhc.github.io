import { useState, useEffect, useCallback } from 'react'
import { GitHubComment, GitHubIssue } from '../types'

// GitHub API 配置
const GITHUB_CONFIG = {
  owner: 'xlxzhc', // GitHub 用户名
  repo: 'xlxzhc.github.io', // 仓库名
  apiUrl: 'https://api.github.com'
}

// 生成 Issue 标题
const generateIssueTitle = (postSlug: string): string => {
  return `Comments for: ${postSlug}`
}

// 查找或创建 Issue
const findOrCreateIssue = async (postSlug: string): Promise<GitHubIssue | null> => {
  const title = generateIssueTitle(postSlug)
  
  try {
    // 首先搜索是否已存在对应的 Issue
    const searchUrl = `${GITHUB_CONFIG.apiUrl}/search/issues?q=repo:${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}+in:title+"${encodeURIComponent(title)}"`
    const searchResponse = await fetch(searchUrl)
    
    if (!searchResponse.ok) {
      throw new Error('搜索 Issue 失败')
    }
    
    const searchData = await searchResponse.json()
    
    if (searchData.items && searchData.items.length > 0) {
      return searchData.items[0]
    }
    
    // 如果没有找到，提示用户手动创建
    console.log('未找到对应的 Issue，需要手动创建')
    return null
    
  } catch (error) {
    console.error('查找 Issue 失败:', error)
    return null
  }
}

// 获取 Issue 评论
const fetchComments = async (issueNumber: number): Promise<GitHubComment[]> => {
  try {
    const url = `${GITHUB_CONFIG.apiUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues/${issueNumber}/comments`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('获取评论失败')
    }
    
    return await response.json()
  } catch (error) {
    console.error('获取评论失败:', error)
    throw error
  }
}

export const useGitHubComments = (postSlug: string) => {
  const [comments, setComments] = useState<GitHubComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [issue, setIssue] = useState<GitHubIssue | null>(null)

  // 加载评论
  const loadComments = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const foundIssue = await findOrCreateIssue(postSlug)
      setIssue(foundIssue)
      
      if (foundIssue) {
        const commentsData = await fetchComments(foundIssue.number)
        setComments(commentsData)
      } else {
        setComments([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载评论失败')
      setComments([])
    } finally {
      setLoading(false)
    }
  }, [postSlug])

  // 创建评论（实际上是跳转到 GitHub）
  const createComment = useCallback(async (content: string) => {
    if (!issue) {
      // 如果没有 Issue，引导用户到 GitHub 创建
      const issueUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues/new?title=${encodeURIComponent(generateIssueTitle(postSlug))}&body=${encodeURIComponent(content)}`
      window.open(issueUrl, '_blank')
      return
    }
    
    // 如果有 Issue，跳转到 GitHub 评论页面
    const commentUrl = `${issue.html_url}#issuecomment-new`
    window.open(commentUrl, '_blank')
    
    // 提示用户刷新页面查看新评论
    setTimeout(() => {
      if (window.confirm('评论已在 GitHub 上发表。是否刷新页面查看最新评论？')) {
        loadComments()
      }
    }, 2000)
  }, [issue, postSlug, loadComments])

  // 刷新评论
  const refreshComments = useCallback(() => {
    loadComments()
  }, [loadComments])

  // 初始加载
  useEffect(() => {
    loadComments()
  }, [loadComments])

  return {
    comments,
    loading,
    error,
    issue,
    issueUrl: issue?.html_url,
    createComment,
    refreshComments
  }
}
