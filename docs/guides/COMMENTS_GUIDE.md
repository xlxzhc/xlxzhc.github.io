# GitHub Issues 评论系统使用指南

本博客使用 GitHub Issues 作为评论系统，为每篇文章创建对应的 Issue 来收集评论和讨论。

## 🎯 系统特点

### 优势
- **无需额外服务器** - 完全基于 GitHub 免费服务
- **Markdown 支持** - 支持完整的 Markdown 语法
- **代码高亮** - 自动语法高亮
- **通知系统** - GitHub 原生的邮件通知
- **版本控制** - 评论历史和编辑记录
- **反垃圾邮件** - GitHub 的反垃圾邮件机制

### 限制
- **需要 GitHub 账号** - 用户必须有 GitHub 账号才能评论
- **API 限制** - 受 GitHub API 速率限制
- **网络依赖** - 需要访问 GitHub API

## 🚀 设置评论系统

### 1. 为文章创建 Issues

#### 自动创建（推荐）

```bash
# 设置 GitHub Token
export GITHUB_TOKEN=your_github_token

# 运行脚本创建 Issues
npm run create:issues
```

#### 手动创建

1. 访问 [GitHub Issues 页面](https://github.com/xlxzhc/xlxzhc.github.io/issues)
2. 点击 "New issue"
3. 使用标题格式：`Comments for: [文章slug]`
4. 添加文章信息到 Issue 描述
5. 添加标签：`blog-comments`, `discussion`

### 2. 获取 GitHub Token

1. 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 选择权限：
   - `public_repo` - 访问公共仓库
   - `repo` - 如果仓库是私有的
4. 复制生成的 token

### 3. 配置仓库信息

编辑 `src/hooks/useGitHubComments.ts`：

```typescript
const GITHUB_CONFIG = {
  owner: 'your-username',    // 你的 GitHub 用户名
  repo: 'your-repo-name',    // 仓库名
  apiUrl: 'https://api.github.com'
}
```

## 💬 用户评论流程

### 对于读者

1. **查看评论**：
   - 评论会自动从对应的 GitHub Issue 加载
   - 支持 Markdown 渲染和代码高亮

2. **发表评论**：
   - 点击"发表评论"按钮
   - 系统会跳转到 GitHub Issue 页面
   - 在 GitHub 上发表评论
   - 返回博客刷新查看新评论

3. **回复评论**：
   - 点击评论下的"回复"链接
   - 跳转到 GitHub 进行回复

### 对于博主

1. **管理评论**：
   - 在 GitHub Issues 页面管理所有评论
   - 可以编辑、删除、关闭 Issues
   - 设置标签和里程碑

2. **通知设置**：
   - GitHub 会自动发送邮件通知
   - 可以在 GitHub 设置中调整通知偏好

## 🔧 自定义配置

### 修改评论样式

编辑以下文件来自定义评论外观：
- `src/components/blog/Comments/Comments.module.scss`
- `src/components/blog/Comments/CommentItem.module.scss`
- `src/components/blog/Comments/CommentForm.module.scss`

### 添加评论功能

在 `src/components/blog/Comments/Comments.tsx` 中可以添加：
- 评论排序
- 评论过滤
- 表情反应
- 评论统计

### 集成其他服务

可以考虑集成：
- **Utterances** - 基于 GitHub Issues 的轻量级评论系统
- **Gitalk** - 另一个基于 GitHub Issues 的评论系统
- **Giscus** - 基于 GitHub Discussions 的评论系统

## 📊 评论数据分析

### 获取评论统计

```javascript
// 获取所有评论 Issues
const issues = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?labels=blog-comments`)

// 统计评论数量
const totalComments = issues.reduce((sum, issue) => sum + issue.comments, 0)
```

### 热门文章分析

根据评论数量分析最受欢迎的文章：

```javascript
const popularPosts = issues
  .sort((a, b) => b.comments - a.comments)
  .slice(0, 5)
```

## 🔒 安全考虑

### 防止滥用

1. **GitHub 账号要求** - 天然的反垃圾邮件机制
2. **仓库权限** - 可以设置协作者权限
3. **Issue 模板** - 使用 Issue 模板规范评论格式
4. **自动化管理** - 使用 GitHub Actions 自动管理

### 隐私保护

- 评论数据存储在 GitHub 上
- 遵循 GitHub 的隐私政策
- 用户可以自行删除评论

## 🚨 故障排除

### 常见问题

**评论不显示**：
- 检查网络连接
- 确认 GitHub API 可访问
- 检查仓库和 Issue 是否存在

**API 限制**：
- GitHub API 有速率限制
- 考虑使用 GitHub Token 提高限制
- 实现缓存机制

**跨域问题**：
- GitHub API 支持 CORS
- 确保请求头正确设置

### 调试方法

1. 打开浏览器开发者工具
2. 查看 Console 中的错误信息
3. 检查 Network 面板中的 API 请求
4. 验证 GitHub API 响应

## 📈 性能优化

### 缓存策略

```javascript
// 实现本地缓存
const cacheKey = `comments-${postSlug}`
const cached = localStorage.getItem(cacheKey)

if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
  return cached.data
}
```

### 懒加载

```javascript
// 只在用户滚动到评论区域时加载
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadComments()
  }
})
```

## 🔄 迁移指南

### 从其他评论系统迁移

1. **导出现有评论数据**
2. **转换为 GitHub Issues 格式**
3. **批量创建 Issues**
4. **更新博客配置**

### 备份评论数据

定期备份 GitHub Issues 数据：

```bash
# 使用 GitHub CLI
gh issue list --repo owner/repo --label blog-comments --json title,body,comments
```

## 📞 获取帮助

- [GitHub Issues API 文档](https://docs.github.com/en/rest/issues)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [项目 Issues 页面](https://github.com/xlxzhc/xlxzhc.github.io/issues)
