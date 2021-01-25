import React from 'react'
import createTablet from '~/common/js/createTablet'
import Button from '@material-ui/core/Button'

export default function Main() {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={createTablet}>
      Создать планшет
    </Button>
  )
}