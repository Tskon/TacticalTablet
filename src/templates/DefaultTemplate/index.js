import React from 'react'
import styles from './index.scss'

export default function DefaultTemplate(props) {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Тактический планшет</h1>
      </header>
      {props.children}
    </div>
  )
}