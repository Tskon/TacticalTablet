import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAddMode} from '~/store/createIconSlice'
import styles from './CanvasWrapper.scss'
import App from '~/components/pixi/app'
import IconFactory from '~/components/pixi/IconFactory';
const iconFactory = new IconFactory(App)

export default function CanvasWrapper() {
  const dispatch = useDispatch()
  const canvas = useRef()

  useEffect(() => {
    canvas.current.appendChild(App.view)
  }, [])

  const {icon, size, color, addMode} = useSelector(state => state.createIcon)
  const createIcon = ({nativeEvent}) => {
    if (!addMode) return
    iconFactory.add(icon, size, nativeEvent.offsetX, nativeEvent.offsetY, color)
    dispatch(setAddMode(false))
  }

  return (
    <div
      ref={canvas}
      className={styles.wrapper}
      onClick={createIcon}
    ></div>
  )
}
