---
title: "青龙面板自动化脚本实战：小米运动刷步数与晓晓优选能量任务详解"
date: 2025-11-04
author: "xlxzhc"
tags: ["自动化", "青龙面板", "Node.js", "脚本开发"]
category: "技术分享"
description: "深入解析 ql-scripts 项目中的两个实用自动化脚本：小米运动刷步数和晓晓优选能量任务，涵盖技术实现、API 集成、配置管理等核心内容"
featured: true
---

# 青龙面板自动化脚本实战：小米运动刷步数与晓晓优选能量任务详解

> 本文深入剖析 ql-scripts 项目的核心技术实现，涵盖 API 逆向、Token 管理、多账号自动化等实战技巧。

## 📋 目录

- [项目概述](#项目概述)
- [技术栈与依赖](#技术栈与依赖)
- [小米运动刷步数脚本详解](#小米运动刷步数脚本详解)
- [晓晓优选能量任务脚本详解](#晓晓优选能量任务脚本详解)
- [通知系统实现](#通知系统实现)
- [实战部署指南](#实战部署指南)
- [常见问题与排查](#常见问题与排查)
- [最佳实践与安全建议](#最佳实践与安全建议)
- [总结与展望](#总结与展望)

---

## 项目概述

`ql-scripts` 是一个专为青龙面板设计的自动化任务脚本集合。本文将深入剖析项目中的两个核心脚本：

1. **xiaomi_motion.js** - 小米运动/Zepp Life 步数自动修改脚本
2. **xxyx_energy.js** - 晓晓优选平台能量任务自动化脚本

---

## 技术栈与依赖

### 核心依赖

```bash
npm install axios uuid
```

### 技术特点

- **运行环境**: Node.js 14+
- **部署平台**: 青龙面板
- **编程范式**: 异步/Promise 模式
- **安全机制**: AES 加密、Token 缓存、用户名脱敏

---

## 小米运动刷步数脚本详解

### 功能特性

- ✅ 手机号和邮箱登录
- ✅ 多账号批量执行
- ✅ 自定义步数范围
- ✅ 智能 Token 缓存
- ✅ 详细日志记录
- ✅ 通知推送

### 环境变量配置

```bash
# 方式1：推荐
XIAOMI_ACCOUNTS=13800138000&password&15000-20000#user@email.com&pass&18000

# 方式2：分别设置
XIAOMI_USERS=13800138000#user@email.com
XIAOMI_PASSWORDS=password#pass
XIAOMI_STEPS=15000-20000#18000
```

### 核心技术实现

#### 1. AES-128-CBC 加密

```javascript
function encryptData(plain) {
    const key = Buffer.from('xeNtBVqzDc6tuNTh', 'utf8');
    const iv = Buffer.from('MAAAYAAAAAAAAABg', 'utf8');
    
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);
    
    let encrypted = cipher.update(plain, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return encrypted;
}
```

#### 2. 三级 Token 管理

```javascript
async login() {
    const cache = this.readCache();
    
    // Level 1: app_token (12小时)
    if (cache?.app_token && isValid(cache.app_token)) {
        return [cache.app_token, cache.user_id];
    }
    
    // Level 2: login_token (15天)
    if (cache?.login_token && !isExpired(cache.login_token)) {
        return await refreshToken(cache.login_token);
    }
    
    // Level 3: 完整登录
    return await fullLogin();
}
```

---

## 晓晓优选能量任务脚本详解

### 功能特性

- ✅ 自动每日签到
- ✅ 完成分享任务
- ✅ 完成视频任务
- ✅ 多账号支持
- ✅ **智能兑换系统**

### 环境变量

```bash
XXYX_TOKENS=token1&token2
XXYX_EXCHANGE=true  # 启用自动兑换
```

### 智能兑换配置

编辑 `xxyx_goods_config.json`：

```json
{
  "goods": [
    {
      "id": 1001,
      "name": "10元话费",
      "price": 5000,
      "enabled": true,
      "priority": 1
    }
  ]
}
```

---

## 通知系统实现

### 支持的通知渠道

- Server 酱（微信）
- PushPlus
- Bark (iOS)
- Telegram Bot
- 钉钉/企业微信
- 邮件通知
- WxPusher

### 配置示例

```bash
# Server酱
PUSH_KEY=SCT123456

# PushPlus
PUSH_PLUS_TOKEN=abc123

# Bark
BARK_PUSH=https://api.day.app/your_key
```

---

## 实战部署指南

### 青龙面板部署

#### 1. 安装依赖

依赖管理 → NodeJS → 添加：
```
axios
uuid
```

#### 2. 上传脚本

将以下文件上传到脚本目录：
- `xiaomi_motion.js`
- `xxyx_energy.js`
- `sendNotify.js`

#### 3. 配置环境变量

```bash
# 小米运动
XIAOMI_ACCOUNTS=你的配置

# 晓晓优选
XXYX_TOKENS=你的token
XXYX_EXCHANGE=true

# 通知（任选）
PUSH_KEY=你的密钥
```

#### 4. 添加定时任务

**小米运动**：
- 命令：`task xiaomi_motion.js`
- 定时：`0 9,15 * * *`

**晓晓优选**：
- 命令：`task xxyx_energy.js`
- 定时：`0 8 * * *`

---

## 常见问题与排查

### 小米运动

**Q: 登录失败？**
- 检查账号密码
- 中国手机号会自动加 +86
- 确认账号未被限制

**Q: Token 失效？**
- 删除 cache 目录
- 检查系统时间
- 减少执行频率

### 晓晓优选

**Q: 如何获取 Token？**
1. F12 打开开发者工具
2. 访问晓晓优选网站
3. Network 查看请求头 `xx-token`

**Q: 商品配置无效？**
- 检查 JSON 格式
- 确认 enabled 为布尔值
- 检查文件权限

---

## 最佳实践与安全建议

### 安全建议

1. **敏感信息保护**
   - 使用环境变量
   - 定期更换密码
   - 不要泄露 Token

2. **权限控制**
   - 使用独立账号
   - 限制文件权限
   - 审查执行日志

### 使用建议

1. **步数设置**：8000-25000 合理范围
2. **执行频率**：每天 1-2 次即可
3. **通知配置**：只保留必要渠道
4. **多账号**：添加随机延迟

---

## 总结与展望

### 项目亮点

1. **完善的错误处理**：三级 Token 管理、自动重试
2. **用户友好**：详细日志、多渠道通知
3. **安全设计**：数据加密、隐私保护
4. **灵活配置**：多账号、自定义策略

### 技术收获

- API 逆向工程与加密实现
- Token 状态管理与缓存策略
- 异步编程最佳实践
- 错误处理与容错设计

### 未来方向

1. **数据分析**：历史数据统计与报表
2. **WebUI**：可视化配置界面
3. **更多平台**：扩展更多自动化任务
4. **智能调度**：基于 AI 的执行策略
5. **分布式部署**：支持多节点协同

---

## 参考资源

- [GitHub 仓库](https://github.com/xlxzhc/ql-scripts)
- [青龙面板官方文档](https://github.com/whyour/qinglong)
- [小米运动 API 参考](https://github.com/TonyJiangWJ/mimotion)
- [Zepp API 文档](https://github.com/hanximeng/Zepp_API)

---

## 免责声明

⚠️ **重要提示**：

1. 本项目仅供学习交流使用
2. 使用者需自行承担使用风险
3. 请遵守相关平台的服务条款
4. 不得用于任何违法违规用途
5. 合理使用，避免账号异常

---

## 结语

通过本文，我们深入学习了青龙面板自动化脚本的开发实践，从 API 逆向、加密实现到 Token 管理、通知系统，每个环节都体现了工程化思维。

希望这些技术经验能帮助你构建更强大的自动化工具。如有问题或建议，欢迎在 GitHub 提 Issue 交流讨论！

**Happy Automation! 🎉**

---

*本文由 xlxzhc 原创，首发于个人技术博客*

*最后更新：2025-11-04*
