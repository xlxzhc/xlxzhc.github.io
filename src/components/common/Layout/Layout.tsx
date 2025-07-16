import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import BackToTop from '../BackToTop/BackToTop'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Layout
