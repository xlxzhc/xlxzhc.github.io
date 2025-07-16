import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/common/Layout/Layout'
import Loading from './components/common/Loading/Loading'
import { ThemeProvider } from './hooks/useTheme'
import { usePerformance, useResourcePerformance } from './hooks/usePerformance'

// 懒加载页面组件
const Home = React.lazy(() => import('./pages/Home/Home'))
const Post = React.lazy(() => import('./pages/Post/Post'))
const About = React.lazy(() => import('./pages/About/About'))

function App() {
  // 全局性能监控
  usePerformance()
  useResourcePerformance()

  return (
    <ThemeProvider>
      <Helmet>
        <title>xlxzhc - 个人博客</title>
        <meta name="description" content="xlxzhc的个人博客，分享技术文章和生活感悟" />
        <meta name="keywords" content="博客,技术,编程,前端,React" />
        <meta name="author" content="xlxzhc" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <Layout>
        <Suspense fallback={<Loading message="页面加载中..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  )
}

export default App
