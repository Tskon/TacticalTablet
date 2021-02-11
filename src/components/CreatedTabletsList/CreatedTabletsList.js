import React from 'react'
import createTablet from '~/common/js/createTablet'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import styles from './CreatedTabletsList.scss'
import {useHistory} from 'react-router-dom'

export default function CreatedTabletsList() {
  let history = useHistory()

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
      </div>
    </Container>
  )
}