import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { PostMetadata } from '../../../types'
import styles from './SearchBox.module.scss'

interface SearchBoxProps {
  posts: PostMetadata[]
  onSearch: (results: PostMetadata[]) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ posts, onSearch }) => {
  const [query, setQuery] = useState('')
  const [fuse, setFuse] = useState<Fuse<PostMetadata> | null>(null)

  useEffect(() => {
    const fuseInstance = new Fuse(posts, {
      keys: ['title', 'excerpt', 'tags'],
      threshold: 0.3,
      includeScore: true,
    })
    setFuse(fuseInstance)
  }, [posts])

  useEffect(() => {
    if (!fuse) return

    if (query.trim() === '') {
      onSearch(posts)
    } else {
      const results = fuse.search(query)
      onSearch(results.map(result => result.item))
    }
  }, [query, fuse, posts, onSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <div className={styles.searchBox}>
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={handleInputChange}
          className={styles.input}
        />
        {query && (
          <button
            onClick={clearSearch}
            className={styles.clearButton}
            aria-label="清除搜索"
          >
            ✕
          </button>
        )}
        <div className={styles.searchIcon}>🔍</div>
      </div>
    </div>
  )
}

export default SearchBox
