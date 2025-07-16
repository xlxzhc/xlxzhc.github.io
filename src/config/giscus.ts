// Giscus评论系统配置
// 配置说明：https://giscus.app/zh-CN

export interface GiscusConfig {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number'
  strict: '0' | '1'
  reactionsEnabled: '0' | '1'
  emitMetadata: '0' | '1'
  inputPosition: 'top' | 'bottom'
  theme: 'light' | 'dark' | 'preferred_color_scheme' | 'transparent_dark' | 'dark_dimmed'
  lang: string
  loading: 'lazy' | 'eager'
}

// 默认配置
export const defaultGiscusConfig: GiscusConfig = {
  repo: 'xlxzhc/xlxzhc.github.io',
  repoId: 'R_kgDOPM0CMQ', // 需要从 https://giscus.app 获取
  category: 'General',
  categoryId: 'DIC_kwDOPM0CMc4CtAlz', // 需要从 https://giscus.app 获取
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'light',
  lang: 'zh-CN',
  loading: 'lazy'
}

// 获取Giscus配置的步骤说明
export const GISCUS_SETUP_GUIDE = `
🔧 Giscus配置步骤：

1. 访问 https://giscus.app/zh-CN
2. 输入仓库信息：xlxzhc/xlxzhc.github.io
3. 确保仓库满足以下条件：
   - 仓库是公开的
   - 已安装 giscus app
   - 已启用 Discussions 功能

4. 选择配置：
   - 页面 ↔️ discussion 映射关系：pathname
   - Discussion 分类：General
   - 特性：启用反应、输入框在评论下方

5. 复制生成的配置信息：
   - data-repo-id
   - data-category-id

6. 更新 src/config/giscus.ts 中的配置

📝 启用 GitHub Discussions：
1. 进入仓库 Settings
2. 找到 Features 部分
3. 勾选 Discussions
4. 点击 Set up discussions

🔗 安装 Giscus App：
访问：https://github.com/apps/giscus
点击 Install 并选择仓库
`

// 主题映射
export const THEME_MAPPING = {
  light: 'light',
  dark: 'dark'
} as const

// 验证配置是否完整
export const validateGiscusConfig = (config: GiscusConfig): boolean => {
  const requiredFields = ['repo', 'repoId', 'category', 'categoryId']
  return requiredFields.every(field => config[field as keyof GiscusConfig])
}

// 生成Giscus脚本属性
export const generateGiscusAttributes = (config: GiscusConfig, theme: 'light' | 'dark') => {
  return {
    'data-repo': config.repo,
    'data-repo-id': config.repoId,
    'data-category': config.category,
    'data-category-id': config.categoryId,
    'data-mapping': config.mapping,
    'data-strict': config.strict,
    'data-reactions-enabled': config.reactionsEnabled,
    'data-emit-metadata': config.emitMetadata,
    'data-input-position': config.inputPosition,
    'data-theme': THEME_MAPPING[theme],
    'data-lang': config.lang,
    'data-loading': config.loading
  }
}
