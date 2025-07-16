# xlxzhc 个人博客

基于 React + TypeScript + Vite 构建的现代化个人博客网站，部署在 GitHub Pages。

## ✨ 特性

- 🎨 **现代化设计** - 简洁美观的界面设计
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🌙 **主题切换** - 支持明亮/暗黑主题切换
- 🔍 **智能搜索** - 基于 Fuse.js 的模糊搜索功能
- 📝 **Markdown 支持** - 完整的 Markdown 语法和代码高亮
- 💬 **评论系统** - 基于 GitHub Issues 的评论功能
- ⚡ **性能优化** - 基于 Vite 的快速构建和热重载
- 🚀 **自动部署** - GitHub Actions 自动构建和部署
- 🔧 **TypeScript** - 完整的类型安全支持

## 🛠️ 技术栈

- **前端框架**: React 18
- **类型系统**: TypeScript
- **构建工具**: Vite
- **样式方案**: SCSS + CSS Modules
- **路由管理**: React Router
- **Markdown 渲染**: react-markdown
- **代码高亮**: react-syntax-highlighter
- **搜索功能**: Fuse.js
- **SEO 优化**: react-helmet-async
- **部署平台**: GitHub Pages

## 📦 安装和运行

### 环境要求

- Node.js >= 18
- npm >= 8

### 本地开发

```bash
# 克隆项目
git clone https://github.com/xlxzhc/xlxzhc.github.io.git
cd xlxzhc.github.io

# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev
```

开发服务器启动后，访问 http://localhost:3000 查看网站。

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 生成 sitemap 和 RSS
npm run build:sitemap
```

## 🚀 部署到 GitHub Pages

### 自动部署（推荐）

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建和部署
3. 网站将在 `https://[username].github.io` 可用

详细部署指南请参考 [DEPLOYMENT.md](./docs/setup/DEPLOYMENT.md)

### 手动部署

```bash
npm run build
# 将 dist 目录内容部署到 GitHub Pages
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   │   ├── Header/     # 页面头部
│   │   ├── Footer/     # 页面底部
│   │   └── Layout/     # 布局组件
│   └── blog/           # 博客相关组件
│       ├── PostCard/   # 文章卡片
│       ├── PostDetail/ # 文章详情
│       └── SearchBox/  # 搜索框
├── pages/              # 页面组件
│   ├── Home/          # 首页
│   ├── Post/          # 文章详情页
│   └── About/         # 关于页面
├── hooks/              # 自定义 Hooks
│   └── useTheme.tsx   # 主题管理
├── utils/              # 工具函数
│   └── sitemap.ts     # SEO 工具
├── types/              # TypeScript 类型定义
│   └── index.ts
├── styles/             # 全局样式
│   └── globals.scss
└── data/               # 静态数据
```

## 🎯 功能说明

### 主题切换
- 支持明亮和暗黑两种主题
- 主题偏好自动保存到 localStorage
- 平滑的主题切换动画

### 搜索功能
- 支持文章标题、内容、标签的模糊搜索
- 实时搜索结果更新
- 搜索结果高亮显示

### 文章系统
- Markdown 格式文章支持
- 代码语法高亮
- 文章标签和分类
- 阅读时间估算

### SEO 优化
- 动态 meta 标签管理
- 自动生成 sitemap.xml
- 结构化数据支持
- 友好的 URL 结构

## 🚀 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建完成后自动部署到 GitHub Pages

### 手动部署

```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
# (需要配置 GitHub Pages 指向 gh-pages 分支)
```

## 📝 内容管理

### 添加新文章

1. 编辑 `src/hooks/usePosts.ts` 添加文章元数据
2. 在 `mockPostContent` 中添加 Markdown 内容
3. 更新 `scripts/generate-sitemap.js` 中的文章数据
4. 重新构建和部署

详细内容管理指南请参考 [CONTENT_GUIDE.md](./docs/guides/CONTENT_GUIDE.md)

### 文章格式

```typescript
{
  id: '1',
  title: '文章标题',
  slug: 'article-slug',
  excerpt: '文章摘要',
  date: '2025-01-15',
  tags: ['React', 'TypeScript'],
  author: 'xlxzhc',
  readTime: 5,
  featured: false
}
```

## 💬 评论系统

博客支持两种评论系统，用户可以自由切换：

### 🌟 Giscus (推荐) - 无感评论体验

基于 GitHub Discussions 的现代化评论系统：
- ✅ 无需跳转，直接在页面内评论
- ✅ 支持回复、表情反应、主题同步
- ✅ 响应式设计，移动端友好

#### 快速设置

1. 在 GitHub 仓库中启用 Discussions 功能
2. 安装 [Giscus App](https://github.com/apps/giscus)
3. 访问 [giscus.app](https://giscus.app/zh-CN) 获取配置参数
4. 更新 `src/config/giscus.ts` 中的配置

详细设置指南：[GISCUS_SETUP.md](./docs/setup/GISCUS_SETUP.md)

### 🔗 GitHub Issues - 传统方式

```bash
# 为文章创建对应的 GitHub Issues
npm run create:issues
```

### 配置说明

- 需要 GitHub 账号才能评论
- 支持 Markdown 语法和代码高亮
- 自动邮件通知

详细配置指南请参考 [COMMENTS_GUIDE.md](./docs/guides/COMMENTS_GUIDE.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

- GitHub: [@xlxzhc](https://github.com/xlxzhc)
- Email: contact@xlxzhc.com

---

## 📚 文档导航

完整的项目文档已整理到 [docs/](./docs/) 目录：

### 🚀 部署配置
- [部署指南](./docs/setup/DEPLOYMENT.md) - 详细的部署步骤和配置
- [Giscus设置](./docs/setup/GISCUS_SETUP.md) - 无感评论系统配置
- [最终部署步骤](./docs/setup/FINAL_DEPLOYMENT_STEPS.md) - 完整的部署检查清单

### 📖 使用指南
- [内容管理](./docs/guides/CONTENT_GUIDE.md) - 文章创建和管理指南
- [评论系统](./docs/guides/COMMENTS_GUIDE.md) - 评论功能使用说明

### 🛠️ 开发文档
- [项目总结](./docs/development/PROJECT_SUMMARY.md) - 完整的技术架构说明
- [提交分析](./docs/development/COMMIT_ANALYSIS.md) - 代码提交策略分析

⭐ 如果这个项目对你有帮助，请给个 Star！
