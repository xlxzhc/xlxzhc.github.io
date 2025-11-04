---
title: "React + TypeScript 最佳实践"
date: "2025-07-10"
author: "xlxzhc"
tags: ["React", "TypeScript", "前端"]
category: "技术分享"
description: "分享在React项目中使用TypeScript的最佳实践和常见陷阱。"
---

# React + TypeScript 最佳实践

在现代前端开发中,React 和 TypeScript 的组合已经成为了主流选择。本文将分享一些在实际项目中总结的最佳实践。

## 组件类型定义

### 函数组件
```typescript
interface Props {
  title: string
  count?: number
  onUpdate: (value: number) => void
}

const MyComponent: React.FC<Props> = ({ title, count = 0, onUpdate }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => onUpdate(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
```

## Hooks 类型安全

### useState
```typescript
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState<boolean>(false)
```

### useEffect
```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.getUser()
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }
  
  fetchData()
}, [])
```

## 常见陷阱

1. **避免使用 any**
2. **正确处理事件类型**
3. **合理使用泛型**

这些实践能帮助你写出更安全、更易维护的代码。