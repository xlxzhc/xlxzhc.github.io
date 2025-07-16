# 🚀 部署和配置文档

本目录包含项目部署和初始配置的相关文档。

## 📋 文档列表

### [DEPLOYMENT.md](./DEPLOYMENT.md)
**详细部署指南**
- 自动部署配置
- 手动部署步骤
- 自定义域名设置
- 环境变量配置
- 常见问题排查

### [GISCUS_SETUP.md](./GISCUS_SETUP.md)
**Giscus无感评论系统设置**
- Giscus vs GitHub Issues对比
- 快速设置步骤
- 详细配置说明
- 自定义样式
- 故障排除

### [FINAL_DEPLOYMENT_STEPS.md](./FINAL_DEPLOYMENT_STEPS.md)
**最终部署步骤**
- 已完成工作总结
- 手动操作步骤
- 部署验证方法
- 故障排除指南

### [github-actions-deploy.yml.backup](./github-actions-deploy.yml.backup)
**GitHub Actions工作流备份**
- 完整的CI/CD工作流配置
- 需要手动添加到 `.github/workflows/deploy.yml`

## 🎯 部署流程

### 第一次部署
1. 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md)
2. 按照 [FINAL_DEPLOYMENT_STEPS.md](./FINAL_DEPLOYMENT_STEPS.md) 执行步骤
3. 配置 [GISCUS_SETUP.md](./GISCUS_SETUP.md) 评论系统

### 后续更新
- 推送代码到main分支即可自动部署
- 查看GitHub Actions页面监控部署状态

## ⚠️ 注意事项

- 确保GitHub Pages已启用
- 检查仓库权限设置
- 验证域名DNS配置（如使用自定义域名）

---
📝 如有问题，请参考各文档的故障排除部分
