import React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>xlxzhc</h3>
            <p>分享技术文章和生活感悟</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>链接</h4>
            <ul>
              <li><a href="https://github.com/xlxzhc" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:contact@xlxzhc.com">联系我</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>技术栈</h4>
            <ul>
              <li>React + TypeScript</li>
              <li>Vite + SCSS</li>
              <li>GitHub Pages</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} xlxzhc. All rights reserved.</p>
          <p>Powered by React & Vite</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
