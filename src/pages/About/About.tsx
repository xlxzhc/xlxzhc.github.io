import React from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './About.module.scss'

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>关于我 - xlxzhc</title>
        <meta name="description" content="了解更多关于xlxzhc的信息" />
      </Helmet>

      <div className="container">
        <div className={styles.aboutPage}>
          <header className={styles.header}>
            <h1>关于我</h1>
            <p className={styles.subtitle}>Hello, I'm xlxzhc</p>
          </header>

          <section className={styles.content}>
            <div className={styles.section}>
              <h2>👋 自我介绍</h2>
              <p>
                欢迎来到我的个人博客！我是一名热爱技术的开发者，专注于前端开发和用户体验设计。
                在这里，我会分享我的技术学习心得、项目经验以及对技术趋势的思考。
              </p>
            </div>

            <div className={styles.section}>
              <h2>💻 技术栈</h2>
              <div className={styles.techStack}>
                <div className={styles.techCategory}>
                  <h3>前端开发</h3>
                  <ul>
                    <li>React / Vue.js</li>
                    <li>TypeScript / JavaScript</li>
                    <li>HTML5 / CSS3 / SCSS</li>
                    <li>Webpack / Vite</li>
                  </ul>
                </div>
                
                <div className={styles.techCategory}>
                  <h3>后端开发</h3>
                  <ul>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>数据库设计</li>
                    <li>API设计</li>
                  </ul>
                </div>
                
                <div className={styles.techCategory}>
                  <h3>工具与平台</h3>
                  <ul>
                    <li>Git / GitHub</li>
                    <li>Docker</li>
                    <li>CI/CD</li>
                    <li>云服务</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>🎯 兴趣爱好</h2>
              <p>
                除了编程，我还喜欢阅读技术书籍、关注开源项目、参与技术社区讨论。
                我相信持续学习和分享是技术成长的重要途径。
              </p>
            </div>

            <div className={styles.section}>
              <h2>📫 联系方式</h2>
              <div className={styles.contact}>
                <a href="https://github.com/xlxzhc" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="mailto:contact@xlxzhc.com">
                  Email
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default About
