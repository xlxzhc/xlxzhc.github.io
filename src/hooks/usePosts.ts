import { useState, useEffect } from 'react'
import { PostMetadata, Post } from '../types'

// 模拟文章数据 - 在实际项目中，这应该从API或静态文件加载
const mockPosts: PostMetadata[] = [
  {
    id: '1',
    title: '欢迎来到我的博客',
    slug: 'welcome-to-my-blog',
    excerpt: '这是我的第一篇博客文章，介绍了这个网站的技术栈和未来规划。',
    date: '2025-07-15',
    tags: ['博客', '介绍', 'React'],
    author: 'xlxzhc',
    readTime: 3,
    featured: true
  },
  {
    id: '2',
    title: 'React + TypeScript 最佳实践',
    slug: 'react-typescript-best-practices',
    excerpt: '分享在React项目中使用TypeScript的最佳实践和常见陷阱。',
    date: '2025-07-10',
    tags: ['React', 'TypeScript', '前端'],
    author: 'xlxzhc',
    readTime: 8
  },
  {
    id: '3',
    title: 'Vite 构建工具深度解析',
    slug: 'vite-build-tool-deep-dive',
    excerpt: '深入了解Vite的工作原理，以及如何优化构建性能。',
    date: '2025-07-05',
    tags: ['Vite', '构建工具', '性能优化'],
    author: 'xlxzhc',
    readTime: 12
  },
  {
    id: '4',
    title: '微信链接重定向绕过插件：Fiddler插件开发实战',
    slug: 'weixin-redirect-bypass-fiddler-plugin',
    excerpt: '深入解析微信链接拦截机制，使用Fiddler插件技术实现自动绕过，包含HTTP拦截、URL提取、JavaScript注入等核心技术实现。',
    date: '2025-07-22',
    tags: ['Fiddler', 'C#', 'HTTP代理', '插件开发', '微信'],
    author: 'xlxzhc',
    readTime: 15
  }
]

const mockPostContent: Record<string, string> = {
  'welcome-to-my-blog': `# 欢迎来到我的博客

这是我的第一篇博客文章！在这里，我想和大家分享一下这个网站的技术栈和未来的规划。

## 技术栈

这个博客使用了以下技术：

- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **SCSS** - 强大的CSS预处理器
- **GitHub Pages** - 免费的静态网站托管

## 功能特性

### 🎨 现代化设计
- 响应式布局，完美适配各种设备
- 暗黑/明亮主题切换
- 流畅的动画效果

### 🔍 强大的搜索
- 基于Fuse.js的模糊搜索
- 支持标题、内容、标签搜索

### 📝 Markdown支持
- 完整的Markdown语法支持
- 代码高亮显示
- 数学公式渲染（计划中）

## 代码示例

\`\`\`typescript
interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  tags: string[]
}

const createPost = (data: BlogPost): BlogPost => {
  return {
    ...data,
    date: new Date().toISOString()
  }
}
\`\`\`

## 未来规划

1. **评论系统** - 集成第三方评论服务
2. **RSS订阅** - 自动生成RSS feed
3. **文章分类** - 按分类组织文章
4. **全文搜索** - 更强大的搜索功能
5. **性能优化** - 图片懒加载、代码分割等

感谢您的访问，希望这个博客能为您带来有价值的内容！`,

  'react-typescript-best-practices': `# React + TypeScript 最佳实践

在现代前端开发中，React 和 TypeScript 的组合已经成为了主流选择。本文将分享一些在实际项目中总结的最佳实践。

## 组件类型定义

### 函数组件
\`\`\`typescript
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
\`\`\`

## Hooks 类型安全

### useState
\`\`\`typescript
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState<boolean>(false)
\`\`\`

### useEffect
\`\`\`typescript
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
\`\`\`

## 常见陷阱

1. **避免使用 any**
2. **正确处理事件类型**
3. **合理使用泛型**

这些实践能帮助你写出更安全、更易维护的代码。`,

  'vite-build-tool-deep-dive': `# Vite 构建工具深度解析

Vite 是一个现代化的前端构建工具，它利用了 ES modules 和现代浏览器的能力来提供极快的开发体验。

## 核心特性

### 极速的冷启动
- 利用 ES modules 的原生支持
- 按需编译，只处理当前页面需要的模块

### 热模块替换 (HMR)
- 精确的模块级别更新
- 保持应用状态

### 优化的构建
- 基于 Rollup 的生产构建
- 代码分割和懒加载支持

## 配置示例

\`\`\`typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns']
        }
      }
    }
  }
})
\`\`\`

## 性能优化技巧

1. **代码分割**
2. **资源预加载**
3. **构建缓存**

Vite 的这些特性让前端开发变得更加高效和愉快。`,

  'weixin-redirect-bypass-fiddler-plugin': `# 微信链接重定向绕过插件：Fiddler插件开发实战

在日常使用微信时，我们经常遇到这样的情况：点击外部链接后，微信会显示一个安全提示页面，要求用户确认是否继续访问。虽然这是出于安全考虑，但在某些场景下会影响用户体验。本文将深入解析微信链接拦截机制，并通过开发一个Fiddler插件来实现自动绕过功能。

## 项目背景

### 问题分析

微信内置浏览器对外部链接实施了安全检查机制，当用户点击外部链接时，会重定向到 \`weixin110.qq.com\` 域名下的确认页面。这个页面包含以下特征：

- **拦截域名**：\`weixin110.qq.com\`
- **路径特征**：\`newredirectconfirmcgi\`
- **页面内容**：包含 \`cgiData\` 的JavaScript数据结构
- **用户交互**：显示"将要访问"提示，需要用户手动点击确认

### 技术挑战

1. **HTTP流量拦截**：需要在HTTP请求/响应过程中进行干预
2. **动态内容解析**：从JavaScript代码中提取真实的目标URL
3. **响应内容修改**：在不破坏页面结构的前提下注入跳转逻辑
4. **用户体验优化**：实现无感知的自动跳转

## 技术方案选择

### 为什么选择Fiddler插件？

经过技术调研，我选择了基于Fiddler的插件开发方案：

**优势分析：**
- ✅ **强大的HTTP代理能力**：Fiddler作为专业的HTTP调试工具，提供了完整的请求/响应拦截机制
- ✅ **丰富的插件接口**：IAutoTamper接口支持在请求/响应的各个阶段进行干预
- ✅ **开发效率高**：基于.NET Framework，可以使用C#进行快速开发
- ✅ **调试友好**：内置的日志和UI系统便于开发和调试

**技术栈选择：**
- **.NET Framework 4.6.2** - 稳定的运行环境
- **Fiddler IAutoTamper接口** - HTTP拦截核心
- **正则表达式** - 内容解析和URL提取
- **JavaScript注入** - 客户端自动跳转
- **Windows Forms** - 用户界面

## 核心技术实现

### 1. HTTP拦截机制

插件的核心是实现Fiddler的 \`IAutoTamper\` 接口，该接口提供了四个关键的拦截点：

\`\`\`csharp
public class WeixinRedirectBypassExtension : IAutoTamper
{
    // 请求前处理
    public void AutoTamperRequestBefore(Session oSession) { }

    // 请求后处理 - 关键：设置响应缓冲
    public void AutoTamperRequestAfter(Session oSession)
    {
        if (!isEnabled || !oSession.hostname.Contains("weixin110.qq.com"))
            return;

        if (oSession.PathAndQuery.Contains("newredirectconfirmcgi"))
        {
            // 关键：开启缓冲，确保可以修改响应体
            oSession.bBufferResponse = true;
            LogMessage($"🔍 请求阶段：已开启响应缓冲 - {oSession.fullUrl}");
        }
    }

    // 响应前处理 - 核心：修改响应内容
    public void AutoTamperResponseBefore(Session oSession) { }

    // 响应后处理
    public void AutoTamperResponseAfter(Session oSession) { }
}
\`\`\`

**关键技术点：**
- **响应缓冲控制**：在请求阶段设置 \`oSession.bBufferResponse = true\`，确保响应内容可以在后续阶段修改
- **域名过滤**：只处理微信相关请求，避免对其他流量造成性能影响
- **路径匹配**：精确识别微信拦截页面的URL特征

### 2. 智能URL提取算法

微信拦截页面的JavaScript中包含了真实的目标URL，但格式可能有所不同。我设计了三层提取策略：

\`\`\`csharp
private string ExtractOriginalUrl(Session oSession)
{
    string responseBody = oSession.GetResponseBodyAsString();

    // 方法1：从cgiData的"url"字段提取（优先级最高）
    var urlFieldMatch = Regex.Match(responseBody,
        @"var\\s+cgiData\\s*=\\s*\\{[^}]*?""url""\\s*:\\s*""([^""]+)""[^}]*?(?:""btns""|\\})",
        RegexOptions.IgnoreCase);

    if (urlFieldMatch.Success) {
        string decodedUrl = HttpUtility.HtmlDecode(urlFieldMatch.Groups[1].Value);
        if (!decodedUrl.Contains("newreadtemplate")) {
            return decodedUrl;
        }
    }

    // 方法2：从cgiData的"desc"字段提取（中等优先级）
    var cgiDataDescMatch = Regex.Match(responseBody,
        @"var\\s+cgiData\\s*=\\s*\\{[^}]*""desc""\\s*:\\s*""([^""]+)""",
        RegexOptions.IgnoreCase);

    if (cgiDataDescMatch.Success) {
        string decodedUrl = HttpUtility.HtmlDecode(cgiDataDescMatch.Groups[1].Value);
        if (decodedUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase)) {
            return decodedUrl;
        }
    }

    // 方法3：备用desc字段提取（最低优先级）
    var descFieldMatch = Regex.Match(responseBody,
        @"""desc""\\s*:\\s*""([^""]+)""",
        RegexOptions.IgnoreCase);

    if (descFieldMatch.Success) {
        string decodedUrl = HttpUtility.HtmlDecode(descFieldMatch.Groups[1].Value);
        if (decodedUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase)) {
            return decodedUrl;
        }
    }

    return null;
}
\`\`\`

**算法特点：**
- **多模式匹配**：支持不同格式的微信拦截页面
- **HTML实体解码**：正确处理 \`&amp;\`、\`&#x2F;\` 等编码
- **URL验证**：确保提取的内容确实是有效的URL
- **优先级策略**：从最精确到最宽松的匹配顺序

### 3. JavaScript注入技术

提取到目标URL后，需要修改响应内容实现自动跳转：

\`\`\`csharp
private void ModifyResponse(Session oSession, string targetUrl)
{
    string originalBody = oSession.GetResponseBodyAsString();

    // 优化显示文本，提升用户体验
    string modifiedBody = originalBody
        .Replace("\\"title\\":\\"将要访问\\"", "\\"title\\":\\"正在跳转\\"")
        .Replace("\\"desc\\":\\"非微信官方网页，请确认是否继续访问。\\"",
                "\\"desc\\":\\"正在自动跳转到目标页面...\\"");

    // 创建自动跳转脚本
    string jumpScript = $@"
    <script type='text/javascript'>
        console.log('微信重定向绕过插件：准备跳转到 {targetUrl}');
        setTimeout(function() {{
            window.location.href = '{targetUrl}';
        }}, 1000);
    </script>";

    // 在<head>标签前注入脚本
    modifiedBody = modifiedBody.Replace("<head>", jumpScript + "\\n<head>");

    // 设置修改后的响应体
    oSession.utilSetResponseBody(modifiedBody);

    // 更新响应头
    oSession.oResponse.headers["Content-Type"] = "text/html; charset=utf-8";
    oSession.oResponse.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
}
\`\`\`

**技术亮点：**
- **延时跳转**：1秒延时让用户看到"正在跳转"提示，提升体验
- **文本优化**：将"将要访问"改为"正在跳转"，减少用户困惑
- **兼容性考虑**：使用JavaScript而非HTTP重定向，确保微信客户端兼容性

### 4. 用户界面设计

插件提供了简洁直观的用户界面：

\`\`\`csharp
private void CreateUI()
{
    tabPage = new TabPage("微信绕过");

    // 功能开关
    enableCheckBox = new CheckBox {
        Text = "启用微信重定向绕过",
        Checked = isEnabled,
        Location = new System.Drawing.Point(10, 10),
        AutoSize = true
    };

    // 操作日志
    logTextBox = new TextBox {
        Multiline = true,
        ScrollBars = ScrollBars.Vertical,
        ReadOnly = true,
        Location = new System.Drawing.Point(10, 45),
        Size = new System.Drawing.Size(760, 350),
        Anchor = AnchorStyles.Top | AnchorStyles.Left |
                AnchorStyles.Right | AnchorStyles.Bottom
    };

    tabPage.Controls.Add(enableCheckBox);
    tabPage.Controls.Add(logTextBox);
    FiddlerApplication.UI.tabsViews.TabPages.Add(tabPage);
}
\`\`\`

## 安装和使用指南

### 系统要求

- **操作系统**：Windows 7/8/10/11
- **.NET Framework**：4.6.2 或更高版本
- **Fiddler**：5.0.0.0 或更高版本

### 安装步骤

#### 方法一：使用预编译版本

1. 从 [GitHub Releases](https://github.com/xlxzhc/WeixinRedirectBypass/releases) 下载最新的 \`WeixinRedirectBypass.dll\`

2. 将DLL文件复制到Fiddler的Scripts目录：
   \`\`\`
   %USERPROFILE%\\Documents\\Fiddler2\\Scripts\\
   \`\`\`

3. 重启Fiddler，插件会自动加载

#### 方法二：从源码编译

\`\`\`bash
# 克隆仓库
git clone https://github.com/xlxzhc/WeixinRedirectBypass.git
cd WeixinRedirectBypass

# 编译项目
dotnet build WeixinRedirectBypass.csproj -c Release

# 复制到Fiddler目录
copy bin\\Release\\WeixinRedirectBypass.dll "%USERPROFILE%\\Documents\\Fiddler2\\Scripts\\"
\`\`\`

### 使用方法

1. **启动Fiddler**并确保插件已加载
2. **配置插件**：在"微信绕过"标签页中勾选"启用微信重定向绕过"
3. **开始使用**：在微信中点击外部链接，插件会自动处理

### 功能验证

插件正常工作时，日志窗口会显示：
\`\`\`
[12:34:56] 📝 检测到微信请求: weixin110.qq.com/cgi-bin/...
[12:34:56] 🎯 提取到目标URL: https://example.com
[12:34:57] ✅ 响应修改完成
\`\`\`

## 性能与兼容性

### 性能指标

- **内存占用**：< 10MB
- **CPU使用率**：< 1%（仅在处理微信请求时工作）
- **响应延迟**：< 50ms
- **启动时间**：< 500ms

### 兼容性测试

| 软件/系统 | 最低版本 | 推荐版本 | 测试状态 |
|-----------|----------|----------|----------|
| Fiddler | 5.0.0.0 | 5.0.20211 | ✅ 完全兼容 |
| .NET Framework | 4.6.2 | 4.8 | ✅ 完全兼容 |
| Windows | Windows 7 SP1 | Windows 10/11 | ✅ 完全兼容 |
| 微信 | 8.0.0 | 最新版本 | ✅ 完全兼容 |

## 技术总结与思考

### 开发心得

1. **HTTP代理开发的复杂性**：需要深入理解HTTP协议和Fiddler的工作机制
2. **正则表达式的重要性**：在处理动态内容时，精确的正则表达式是关键
3. **用户体验的平衡**：在功能实现和用户体验之间找到最佳平衡点
4. **错误处理的必要性**：完善的异常处理确保插件的稳定性

### 技术扩展思考

**可能的改进方向：**
- **支持更多平台**：考虑开发浏览器扩展版本
- **智能识别**：使用机器学习提升URL提取准确率
- **配置化**：支持用户自定义拦截规则
- **统计分析**：添加使用统计和性能分析功能

**安全考虑：**
- 插件会绕过微信的安全检查，使用时需要确保访问链接的安全性
- 建议仅在可信环境下使用，避免访问未知来源的链接
- 定期更新插件以应对微信机制的变化

### 项目价值

这个项目不仅解决了实际的用户痛点，更重要的是展示了以下技术能力：

1. **HTTP协议深度理解**：掌握了HTTP请求/响应的完整生命周期
2. **代理技术应用**：熟练使用Fiddler进行网络流量分析和修改
3. **正则表达式精通**：能够处理复杂的文本解析需求
4. **C#/.NET开发**：具备完整的Windows应用开发能力
5. **用户体验设计**：在技术实现中充分考虑用户体验

## 结语

通过这个项目，我深入学习了HTTP代理技术、Fiddler插件开发、以及网络流量分析等技术领域。虽然这是一个相对小众的应用场景，但其中涉及的技术原理和开发方法具有很强的通用性，可以应用到更广泛的网络工具开发中。

如果你对这个项目感兴趣，欢迎访问 [GitHub仓库](https://github.com/xlxzhc/WeixinRedirectBypass) 查看完整源码，或者在评论区分享你的想法和建议！

---

**免责声明**：本插件仅供学习和研究使用，请遵守相关法律法规和平台使用条款。使用时请确保访问链接的安全性，作者不对因使用本插件造成的任何损失承担责任。`
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟异步加载
    const loadPosts = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        setPosts(mockPosts)
      } catch (error) {
        console.error('Failed to load posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return { posts, loading }
}

export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const postMeta = mockPosts.find(p => p.slug === slug)
        const content = mockPostContent[slug]
        
        if (postMeta && content) {
          setPost({
            ...postMeta,
            content
          })
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Failed to load post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  return { post, loading, notFound }
}
