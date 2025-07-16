import React from 'react'
import styles from './Loading.module.scss'

interface LoadingProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

const Loading: React.FC<LoadingProps> = ({ 
  message = '加载中...', 
  size = 'medium' 
}) => {
  return (
    <div className={styles.loading}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default Loading
