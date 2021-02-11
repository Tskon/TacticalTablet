import React from 'react'
import '~/common/styles/reset.scss'
import styles from './index.scss'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function DefaultTemplate(props) {
  return (
    <div>
      <AppBar
        className={styles.header}
        color="primary"
        position="static"
      >
        <Toolbar>
          <Typography variant="h4">
            Тактический планшет
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  )
}