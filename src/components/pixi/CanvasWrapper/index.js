import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {throttle} from 'lodash'
import {setAddMode} from '~/store/createIconSlice'
import {setPointerCoords, setIconData} from '~/store/tabletDataSlice'
import styles from './CanvasWrapper.scss'
import createPixiApp from '~/services/pixiApp'
import IconFactory from '~/services/IconFactory'
import Cursor from '~/common/images/cursor.svg'
import PropTypes from 'prop-types'

let pixiApp = null

const CanvasWrapper = ({width, height}) => {
  if (!pixiApp) {
    pixiApp = createPixiApp(width, height)
  }

  const iconFactory = new IconFactory(pixiApp)
  const dispatch = useDispatch()
  const canvas = useRef()

  const onMoveCb = ({id, x, y}) => {
    dispatch(setIconData({data: {
      id,
      x: Math.round(x),
      y: Math.round(y),
    }}))
  }

  useEffect(() => {
    canvas.current.appendChild(pixiApp.view)
  }, [])

  const {icon, size, color, addMode} = useSelector(state => state.createIcon)
  const {pointer} = useSelector(state => state.wsData)
  const {icons} = useSelector(state => state.tabletData)

  useEffect(() => {
    const renderedIconList = pixiApp.stage.children

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

    dispatch(setIconData({data: newIcon}))
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
        style={{width, height}}
        className={styles.canvas}
      >
      </div>
      { pointer && cursorImg }
    </div>
  )
}

CanvasWrapper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export default CanvasWrapper
