import React, {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import styles from './CanvasWrapper.scss'
import App from '~/components/pixi/app'
import IconFactory from '~/components/pixi/IconFactory';
const iconFactory = new IconFactory(App)

export default function CanvasWrapper() {
  const canvas = useRef()

  useEffect(() => {
    canvas.current.appendChild(App.view)
  }, [])

  const {icon, size, color} = useSelector(state => state.createIcon)
  const createIcon = ({nativeEvent}) => {
    iconFactory.add(icon, size, nativeEvent.offsetX, nativeEvent.offsetY, color)
  }

  return (
    <div
      ref={canvas}
      className={styles.wrapper}
      onClick={createIcon}
    ></div>
  )
}
