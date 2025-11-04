/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  // 添加 glob 类型支持
  glob: (pattern: string, options?: {
    eager?: boolean
    as?: 'raw' | 'url'
  }) => Record<string, any>
}
