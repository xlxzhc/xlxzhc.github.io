# Giscus 无感评论系统设置指南

本指南将帮助您配置 Giscus，实现真正的无感评论体验。

## 🎯 什么是 Giscus？

Giscus 是一个基于 GitHub Discussions 的评论系统，它允许用户直接在您的博客页面内进行评论，无需跳转到 GitHub。

### 优势对比

| 特性 | Giscus (推荐) | GitHub Issues |
|------|---------------|---------------|
| 用户体验 | ✅ 无感，页面内评论 | ❌ 需要跳转到 GitHub |
| 功能丰富度 | ✅ 回复、表情、分类 | ⚠️ 基础评论功能 |
| 主题同步 | ✅ 自动同步博客主题 | ❌ GitHub 默认主题 |
| 移动端体验 | ✅ 响应式设计 | ⚠️ GitHub 移动端 |
| 管理便利性 | ✅ GitHub Discussions | ✅ GitHub Issues |

## 🚀 快速设置

### 第一步：启用 GitHub Discussions

1. 进入您的 GitHub 仓库
2. 点击 **Settings** 标签
3. 向下滚动到 **Features** 部分
4. 勾选 **Discussions** 复选框
5. 点击 **Set up discussions** 按钮

### 第二步：安装 Giscus App

1. 访问 [Giscus GitHub App](https://github.com/apps/giscus)
2. 点击 **Install** 按钮
3. 选择您的仓库 `xlxzhc/xlxzhc.github.io`
4. 确认安装

### 第三步：获取配置参数

1. 访问 [giscus.app](https://giscus.app/zh-CN)
2. 在 **仓库** 部分输入：`xlxzhc/xlxzhc.github.io`
3. 确保显示 ✅ 所有条件都满足
4. 在 **页面 ↔️ discussion 映射关系** 选择：`pathname`
5. 在 **Discussion 分类** 选择：`General`
6. 在 **特性** 部分：
   - ✅ 启用反应
   - ✅ 输入框在评论下方
7. 复制生成的配置代码中的关键参数

### 第四步：更新博客配置

编辑 `src/config/giscus.ts` 文件：

```typescript
export const defaultGiscusConfig: GiscusConfig = {
  repo: 'xlxzhc/xlxzhc.github.io',
  repoId: 'YOUR_REPO_ID',           // 从 giscus.app 复制
  category: 'General',
  categoryId: 'YOUR_CATEGORY_ID',   // 从 giscus.app 复制
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'light',
  lang: 'zh-CN',
  loading: 'lazy'
}
```

### 第五步：测试评论功能

1. 重新构建并启动博客：
   ```bash
   npm run build
   npm run dev
   ```

2. 访问任意文章页面
3. 滚动到评论区域
4. 确认看到 Giscus 评论框
5. 使用 GitHub 账号登录并测试评论

## 🔧 详细配置说明

### 获取 repoId 和 categoryId

在 giscus.app 配置页面，您会看到类似这样的代码：

```html
<script src="https://giscus.app/client.js"
        data-repo="xlxzhc/xlxzhc.github.io"
        data-repo-id="R_kgDONGxYdw"
        data-category="General"
        data-category-id="DIC_kwDONGxYd84CkQHZ"
        ...>
</script>
```

复制其中的：
- `data-repo-id` 的值作为 `repoId`
- `data-category-id` 的值作为 `categoryId`

### 主题配置

博客会自动根据用户选择的主题（明亮/暗黑）同步 Giscus 的主题。

### 语言设置

当前配置为中文 (`zh-CN`)，如需其他语言可修改 `lang` 参数。

## 🎨 自定义样式

### 主题同步

Giscus 会自动与博客主题同步：
- 明亮模式 → `light` 主题
- 暗黑模式 → `dark` 主题

### 自定义 CSS

可以通过修改 `src/components/blog/Comments/GiscusComments.module.scss` 来自定义评论区域的样式。

## 🔄 评论系统切换

博客支持在两种评论系统之间切换：

1. **Giscus** (推荐) - 无感评论体验
2. **GitHub Issues** - 传统跳转方式

用户可以在评论区域顶部的切换按钮中选择偏好的评论系统。

## 🚨 故障排除

### 常见问题

**问题：评论区域显示配置错误**
- 检查是否已启用 GitHub Discussions
- 确认 Giscus App 已正确安装
- 验证 `repoId` 和 `categoryId` 是否正确

**问题：评论无法加载**
- 检查网络连接
- 确认仓库是公开的
- 查看浏览器控制台的错误信息

**问题：主题不同步**
- 确认博客主题切换功能正常
- 检查 Giscus 组件的主题更新逻辑

### 调试步骤

1. 打开浏览器开发者工具
2. 查看 Console 面板的错误信息
3. 检查 Network 面板的请求状态
4. 验证 Giscus iframe 是否正确加载

## 📈 性能优化

### 懒加载

Giscus 组件默认启用懒加载，只有当用户滚动到评论区域时才会加载。

### 缓存策略

评论数据由 GitHub 管理，具有良好的缓存策略。

## 🔒 隐私和安全

- 评论数据存储在 GitHub Discussions 中
- 遵循 GitHub 的隐私政策
- 用户可以随时编辑或删除自己的评论
- 仓库管理员可以管理所有评论

## 📞 获取帮助

如果遇到问题：

1. 查看 [Giscus 官方文档](https://giscus.app/zh-CN)
2. 检查 [GitHub Discussions API 文档](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions)
3. 在项目 Issues 中提问

## 🎉 完成！

配置完成后，您的博客将拥有现代化的无感评论体验！用户可以：

- 直接在博客页面评论，无需跳转
- 使用 Markdown 语法编写评论
- 添加表情反应和回复
- 享受与博客主题同步的界面
