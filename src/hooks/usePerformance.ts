import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
}

export const usePerformance = () => {
  useEffect(() => {
    // 只在生产环境中启用性能监控
    if (process.env.NODE_ENV !== 'production') return

    const observer = new PerformanceObserver((list) => {
      const metrics: PerformanceMetrics = {}
      
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime
            }
            break
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime
            break
          case 'first-input':
            metrics.fid = entry.processingStart - entry.startTime
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value
            }
            break
        }
      }
      
      // 在实际项目中，这里可以发送到分析服务
      console.log('Performance Metrics:', metrics)
    })

    // 观察各种性能指标
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      console.warn('Performance Observer not supported:', error)
    }

    return () => {
      observer.disconnect()
    }
  }, [])
}

// 页面加载性能监控
export const usePageLoadPerformance = (pageName: string) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      // 记录页面加载时间
      console.log(`Page ${pageName} load time: ${loadTime.toFixed(2)}ms`)
      
      // 在实际项目中，可以发送到分析服务
      if (process.env.NODE_ENV === 'production') {
        // analytics.track('page_load_time', { page: pageName, time: loadTime })
      }
    }
  }, [pageName])
}

// 资源加载监控
export const useResourcePerformance = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          
          // 监控慢资源
          if (resource.duration > 1000) {
            console.warn(`Slow resource detected: ${resource.name} (${resource.duration.toFixed(2)}ms)`)
          }
          
          // 监控失败的资源
          if (resource.transferSize === 0 && resource.decodedBodySize === 0) {
            console.error(`Failed to load resource: ${resource.name}`)
          }
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['resource'] })
    } catch (error) {
      console.warn('Resource Performance Observer not supported:', error)
    }

    return () => {
      observer.disconnect()
    }
  }, [])
}
