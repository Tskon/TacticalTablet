import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {setIcon, setColor, setSize, setAddMode} from '~/store/createIconSlice'
import styles from './Panel.scss'

const Panel = ({icons}) => {
  const dispatch = useDispatch()
  const {color, icon, iconIndex, size, addMode} = useSelector(state => state.createIcon)
  const hexColor = color.replace('0x', '#')

  const buttons = icons.map((icon, i) => {
    const borderStyle = (addMode && iconIndex === i) ? `1px solid ${hexColor}` : 'none'

    return (
      <button
        className={styles.button}
        style={{
          border: borderStyle
        }}
        onClick={() => {
          dispatch(setIcon({icon, iconIndex: i}))
          dispatch(setAddMode(true))
        }}
        key={i}
      >
        <img src={icon} alt="icon"/>
      </button>
    )
  })

  const imageStyles = {
    width: `${size}px`,
    height: `${size}px`,
  }

  return (
    <div>
      <div className={styles.panel}>{buttons}</div>
      <div className={styles.panel}>
        <button
          className={styles.buttonRed}
          onClick={() => {dispatch(setColor('#990000'))}}
        ></button>
        <button
          className={styles.buttonGreen}
          onClick={() => {dispatch(setColor('#009900'))}}
        ></button>
        <input
          className={styles.colorPicker}
          value={hexColor}
          type="color"
          onChange={({target}) => {dispatch(setColor(target.value))}}
        />
      </div>
      <div className={styles.panel}>
        <input
          type="range"
          min="10"
          max="300"
          onInput={({target}) => {dispatch(setSize(target.value))}}
        />
        { size } px
        {icon &&
          <img
            src={icon}
            style={imageStyles}
            alt="Выбранная иконка"
          />
        }
      </div>
    </div>
  )
}

Panel.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string)
}

export default Panel
