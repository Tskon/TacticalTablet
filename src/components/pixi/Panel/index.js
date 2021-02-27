import React from 'react';
import PropTypes from 'prop-types'
import styles from './Panel.scss'
import IconFactory from '~/components/pixi/IconFactory';
import App from '../app'

const iconFactory = new IconFactory(App)

const Panel = ({icons}) => {

  const buttons = icons.map((icon, i) => {
    const createIcon = () => {iconFactory.add(icon, 100, 150, Math.random() * 0xffffff)}
    return (
      <button
        className={styles.button}
        onClick={createIcon}
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
