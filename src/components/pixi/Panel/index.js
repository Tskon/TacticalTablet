import React from 'react';
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {setIcon, setColor} from '~/store/createIconSlice';
import styles from './Panel.scss'

const Panel = ({icons}) => {
  const dispatch = useDispatch()
  const {color} = useSelector(state => state.createIcon)
  const hexColor = color.replace('0x', '#')

  const buttons = icons.map((icon, i) => {
    return (
      <button
        className={styles.button}
        onClick={() => {dispatch(setIcon(icon))}}
        key={i}
      >
        <img src={icon} alt="icon"/>
      </button>
    )
  })

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
    </div>
  )
}

Panel.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string)
}

export default Panel
