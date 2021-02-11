import React, {useEffect} from 'react'
import createTablet from '~/common/js/createTablet'
import Button from '@material-ui/core/Button'
import cookies from 'js-cookie'

import CreatedTabletsList from '../../components/CreatedTabletsList/CreatedTabletsList.js'


export default function Main() {
  useEffect(() => {
    console.log(cookies.get('tablets'))
  }, [])

  return (
    <CreatedTabletsList />
  )
}