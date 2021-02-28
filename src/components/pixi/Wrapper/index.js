import React from 'react'
import PropTypes from 'prop-types'
import styles from './Wrapper.scss'

const Wrapper = (props) => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
)

Wrapper.propTypes = {
  children: PropTypes.array
}

export default Wrapper
