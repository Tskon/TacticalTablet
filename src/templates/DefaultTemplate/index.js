import React from 'react'
import '~/common/styles/reset.scss'
import styles from './index.scss'
import {Link} from 'react-router-dom';

export default function DefaultTemplate(props) {
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <h1 className={styles.title}>
          Тактический планшет
          </h1>
        </Link>
      </header>
      {props.children}
    </div>
  )
}
