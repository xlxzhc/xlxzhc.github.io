# 部署指南

本文档详细说明如何将博客部署到 GitHub Pages。

## 🚀 自动部署（推荐）

### 1. 启用 GitHub Pages

1. 进入 GitHub 仓库设置页面
2. 找到 "Pages" 选项
3. 在 "Source" 中选择 "GitHub Actions"

### 2. 配置仓库权限

确保仓库具有以下权限：
- Settings → Actions → General → Workflow permissions
- 选择 "Read and write permissions"
- 勾选 "Allow GitHub Actions to create and approve pull requests"

### 3. 触发部署

- **自动触发**：推送代码到 `main` 分支
- **手动触发**：在 Actions 页面点击 "Run workflow"

### 4. 验证部署

部署完成后，网站将在以下地址可用：
```
https://[username].github.io
```

## 🛠️ 手动部署

如果需要手动部署，可以按照以下步骤：

### 1. 本地构建

```bash
# 安装依赖
npm install --legacy-peer-deps

# 构建项目
npm run build
```

### 2. 部署到 GitHub Pages

```bash
# 安装 gh-pages 工具
npm install -g gh-pages

# 部署到 gh-pages 分支
gh-pages -d dist
```

## 📝 自定义域名

如果要使用自定义域名：

### 1. 添加 CNAME 文件

在 `public` 目录下创建 `CNAME` 文件：
```
yourdomain.com
```

### 2. 配置 DNS

在域名提供商处添加以下记录：
```
Type: CNAME
Name: www (或 @)
Value: [username].github.io
```

### 3. 更新配置

更新以下文件中的域名：
- `src/utils/sitemap.ts`
- `scripts/generate-sitemap.js`
- `src/components/common/StructuredData/StructuredData.tsx`

## 🔧 环境变量

如果需要使用环境变量，可以在 GitHub 仓库设置中添加：

1. Settings → Secrets and variables → Actions
2. 添加所需的环境变量
3. 在 `.github/workflows/deploy.yml` 中使用

## 📊 部署监控

### 查看部署状态

1. 进入 GitHub 仓库的 Actions 页面
2. 查看最新的工作流运行状态
3. 点击具体的运行查看详细日志

### 常见问题排查

**构建失败**：
- 检查 Node.js 版本是否兼容
- 确认所有依赖都已正确安装
- 查看构建日志中的错误信息

**部署失败**：
- 确认 GitHub Pages 已正确配置
- 检查仓库权限设置
- 验证工作流文件语法

**网站无法访问**：
- 等待 DNS 传播（可能需要几分钟）
- 检查自定义域名配置
- 确认 HTTPS 设置

## 🔄 回滚部署

如果需要回滚到之前的版本：

1. 进入 Actions 页面
2. 找到要回滚的成功部署
3. 点击 "Re-run jobs"

或者：

```bash
# 回滚到指定提交
git reset --hard <commit-hash>
git push --force-with-lease origin main
```

## 📈 性能优化

### 启用压缩

GitHub Pages 自动启用 gzip 压缩，无需额外配置。

### CDN 加速

考虑使用 Cloudflare 等 CDN 服务来加速全球访问。

### 缓存策略

静态资源已配置适当的缓存头，浏览器会自动缓存。

## 🔒 安全考虑

- 不要在代码中暴露敏感信息
- 使用环境变量存储 API 密钥
- 定期更新依赖包以修复安全漏洞

## 📞 获取帮助

如果遇到部署问题：

1. 查看 [GitHub Pages 文档](https://docs.github.com/en/pages)
2. 检查项目的 Issues 页面
3. 联系项目维护者
