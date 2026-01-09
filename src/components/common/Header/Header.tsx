import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../../hooks/useTheme'
import styles from './Header.module.scss'
import clsx from 'clsx'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: '首页' },
    {
      path: 'https://xlxzhc.github.io/sf-express-return-picture/',
      label: '顺丰退货截图',
      external: true,
    },
    { path: '/about', label: '关于' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <h1>xlxzhc</h1>
          </Link>

          <nav className={clsx(styles.nav, { [styles.navOpen]: isMenuOpen })}>
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  className={styles.navLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(styles.navLink, {
                    [styles.active]: location.pathname === item.path,
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className={styles.headerActions}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="切换主题"
            >
              {theme.mode === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label="菜单"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
