# 内容管理指南

本指南说明如何在博客中添加、编辑和管理文章内容。

## 📝 添加新文章

### 1. 更新文章数据

编辑 `src/hooks/usePosts.ts` 文件，在 `mockPosts` 数组中添加新文章：

```typescript
{
  id: '4', // 唯一ID
  title: '文章标题',
  slug: 'article-slug', // URL友好的标识符
  excerpt: '文章摘要，显示在列表页',
  date: '2025-01-20', // 发布日期 YYYY-MM-DD
  tags: ['标签1', '标签2'], // 文章标签
  author: 'xlxzhc', // 作者
  readTime: 5, // 预估阅读时间（分钟）
  featured: false // 是否为精选文章
}
```

### 2. 添加文章内容

在 `mockPostContent` 对象中添加对应的内容：

```typescript
'article-slug': `# 文章标题

这里是文章的 Markdown 内容...

## 二级标题

支持完整的 Markdown 语法。
`
```

### 3. 更新构建脚本

编辑 `scripts/generate-sitemap.js`，在 `posts` 数组中添加相同的文章数据。

## ✏️ 编辑现有文章

1. 在 `src/hooks/usePosts.ts` 中找到对应文章
2. 修改元数据或内容
3. 重新构建和部署

## 🏷️ 管理标签

### 添加新标签

直接在文章的 `tags` 数组中添加新标签即可。

### 标签最佳实践

- 使用简洁明了的标签名
- 保持标签的一致性
- 避免过多标签（建议3-5个）
- 使用中文标签以保持一致性

## 📁 文章组织

### 文章分类建议

- **技术文章**：React, Vue, JavaScript, TypeScript, CSS
- **工具使用**：Git, Webpack, Vite, Docker
- **经验分享**：最佳实践, 踩坑记录, 学习心得
- **项目介绍**：开源项目, 个人作品

### URL 规范

文章的 `slug` 应该：
- 使用小写字母
- 用连字符分隔单词
- 简洁且描述性强
- 避免使用特殊字符

示例：
- ✅ `react-hooks-guide`
- ✅ `javascript-best-practices`
- ❌ `React_Hooks_Guide`
- ❌ `javascript best practices`

## 🖼️ 图片管理

### 添加图片

1. 将图片放在 `public/images/` 目录下
2. 在 Markdown 中引用：

```markdown
![图片描述](/images/your-image.jpg)
```

### 图片优化建议

- 使用 WebP 格式以获得更好的压缩率
- 控制图片大小（建议宽度不超过 800px）
- 为图片添加有意义的 alt 文本
- 考虑使用 LazyImage 组件进行懒加载

## 📊 SEO 优化

### 文章标题

- 保持在 60 字符以内
- 包含关键词
- 具有吸引力和描述性

### 文章摘要

- 控制在 150-160 字符
- 准确概括文章内容
- 包含相关关键词

### 标签使用

- 选择相关性高的标签
- 使用用户可能搜索的关键词
- 保持标签的一致性

## 🔄 内容更新流程

### 开发环境测试

```bash
# 启动开发服务器
npm run dev

# 在浏览器中预览更改
# http://localhost:3000
```

### 发布流程

1. 提交更改到 Git
2. 推送到 main 分支
3. GitHub Actions 自动构建和部署
4. 验证线上效果

## 📈 内容分析

### 文章表现指标

虽然当前是静态博客，但可以考虑集成：
- Google Analytics
- 百度统计
- 其他网站分析工具

### 内容规划

建议定期发布内容：
- 技术文章：每周 1-2 篇
- 经验分享：每月 2-3 篇
- 项目更新：根据实际情况

## 🎨 样式自定义

### 文章样式

文章样式定义在 `src/pages/Post/Post.module.scss` 中，可以自定义：
- 标题样式
- 代码块样式
- 引用块样式
- 链接样式

### 代码高亮

支持多种编程语言的语法高亮，在代码块中指定语言：

```markdown
\`\`\`javascript
const hello = 'world';
\`\`\`
```

## 🔧 高级功能

### 数学公式

可以考虑集成 KaTeX 或 MathJax 来支持数学公式渲染。

### 评论系统

可以集成第三方评论系统如：
- Disqus
- Gitalk
- Utterances

### RSS 订阅

RSS feed 会自动生成，用户可以通过以下地址订阅：
```
https://xlxzhc.github.io/rss.xml
```

## 📝 Markdown 语法参考

支持标准 Markdown 语法：

- **粗体文本**
- *斜体文本*
- `行内代码`
- [链接](https://example.com)
- 有序列表和无序列表
- 表格
- 引用块
- 代码块

## 🚨 注意事项

- 确保所有链接都是有效的
- 定期检查图片是否正常显示
- 保持内容的时效性
- 遵守版权法律法规
- 备份重要内容
