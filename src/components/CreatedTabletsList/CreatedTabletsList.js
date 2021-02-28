import React, { useState } from 'react'
import createTablet from '~/common/js/createTablet'
import styles from './CreatedTabletsList.scss'
import {useHistory} from 'react-router-dom'
import cookies from 'js-cookie'

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function CreatedTabletsList() {
  let history = useHistory()

  const createdTabletsKeys = useState(JSON.parse(cookies.get('tablets')))

  const createdCards = function(keys) {
    return (
      keys.map(key => <div key={key}>key</div>)
    )
  }

  async function createNewTablet() {
    const {editId} = await createTablet()
    history.push(`/tablet/${editId}`)
  }



  return (
    <Container>
      <div className={styles.container}>
        <Button
          variant="contained"
          color="default"
          onClick={createNewTablet}>
          Создать планшет
        </Button>
        { createdCards }
      </div>
    </Container>
  )
}