import React, {useEffect, useRef} from 'react'
import styles from './CanvasWrapper.scss'
import App from '../app'

export default () => {
  const canvas = useRef()

  useEffect(() => {
    canvas.current.appendChild(App.view)
  }, [])

  return (
    <div
      ref={canvas}
      className={styles.wrapper}
    ></div>
  )
}
