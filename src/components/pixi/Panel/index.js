import React from 'react';
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {setIcon} from '~/store/createIconSlice';
import styles from './Panel.scss'

const Panel = ({icons}) => {
  const dispatch = useDispatch()

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
    </div>
  )
}

Panel.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string)
}

export default Panel
