import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {throttle} from 'lodash'
import {setAddMode} from '~/store/createIconSlice'
import {setPointerCoords, setIconData} from '~/store/tabletDataSlice'
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
  const {pointer} = useSelector(state => state.wsData)
  const createIcon = ({nativeEvent}) => {
    if (!addMode) return

    const newIcon = {
      img: icon,
      size,
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY,
      color,
    }

    const onMoveCb = ({id, x, y}) => {
      dispatch(setIconData({
        id,
        x: Math.round(x),
        y: Math.round(y),
      }))
    }

    const iconId = iconFactory.add(newIcon, throttle(onMoveCb, 100))
    newIcon.id = iconId

    dispatch(setIconData(newIcon))
    dispatch(setAddMode(false))
  }

  const setPoiterCoords = throttle(({nativeEvent: {offsetX: x, offsetY: y}}) => {
    dispatch(setPointerCoords({x, y}))
  }, 100)

  const cursorImg = <div className={styles.cursor} style={{
    top: pointer ? pointer.y : 0,
    left: pointer ? pointer.x : 0,
  }}></div>

  return (
    <div className={styles.wrapper}>
      <div
        ref={canvas}
        className={styles.canvas}
        onClick={createIcon}
        onMouseMove={setPoiterCoords}
      >
      </div>
      { pointer && cursorImg }
    </div>
  )
}
