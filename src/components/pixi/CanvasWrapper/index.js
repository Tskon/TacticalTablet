import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {throttle} from 'lodash'
import {setAddMode} from '~/store/createIconSlice'
import {setPointerCoords, setIconData} from '~/store/tabletDataSlice'
import styles from './CanvasWrapper.scss'
import App from '~/components/pixi/app'
import IconFactory from '~/services/IconFactory';
import Cursor from '~/common/images/cursor.svg'

const iconFactory = new IconFactory(App)

export default function CanvasWrapper() {
  const dispatch = useDispatch()
  const canvas = useRef()

  const onMoveCb = ({id, x, y}) => {
    dispatch(setIconData({
      id,
      x: Math.round(x),
      y: Math.round(y),
    }))
  }

  useEffect(() => {
    canvas.current.appendChild(App.view)
  }, [])

  const {icon, size, color, addMode} = useSelector(state => state.createIcon)
  const {pointer} = useSelector(state => state.wsData)
  const {icons} = useSelector(state => state.tabletData)

  useEffect(() => {
    const renderedIconList = App.stage.children

    Object.values(icons).forEach(item => {
      const renderedIcon = renderedIconList.find(({id}) => id === item.id)

      if (renderedIcon) {
        Object.keys(item).forEach(key => {
          if (key === 'color') return renderedIcon.tint = item[key]
          renderedIcon[key] = item[key]
        })
      } else {
        iconFactory.add(item, throttle(onMoveCb, 1000 / 60))
      }
    })
  }, [icons])

  const createIcon = ({nativeEvent}) => {
    if (!addMode) return

    const newIcon = {
      img: icon,
      size,
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY,
      color,
    }

    const iconId = iconFactory.add(newIcon, throttle(onMoveCb, 1000 / 60))
    newIcon.id = iconId

    dispatch(setIconData(newIcon))
    dispatch(setAddMode(false))
  }

  const setPoiterCoords = throttle(({nativeEvent: {offsetX: x, offsetY: y}}) => {
    dispatch(setPointerCoords({x, y}))
  }, 100)

  const cursorImg = <img
    src={Cursor}
    className={styles.cursor}
    style={{
      top: pointer ? pointer.y : 0,
      left: pointer ? pointer.x : 0,
    }}
  ></img>

  return (
    <div
      className={styles.wrapper}
      onClick={createIcon}
      onMouseMove={setPoiterCoords}
    >
      <div
        ref={canvas}
        className={styles.canvas}
      >
      </div>
      { pointer && cursorImg }
    </div>
  )
}
