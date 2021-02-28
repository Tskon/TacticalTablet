import React from 'react'
import createTablet from '~/common/js/createTablet'
import styles from './CreatedTabletsList.scss'
import {useHistory} from 'react-router-dom'
import jsCookie from 'js-cookie'
import { Link } from 'react-router-dom'

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export default function CreatedTabletsList() {
  let history = useHistory()

  const createdTabletsKeys = JSON.parse(jsCookie.get('tablets') || [])

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
          onClick={createNewTablet}
        >
          Создать планшет
        </Button>
        {
          createdTabletsKeys.map((item) => (
            <Card key={item}>
              <CardContent>
                <h2>{item}</h2>
              </CardContent>
              <CardActions>
                <Link to={`/tablet/${item}`}>Вход</Link>
              </CardActions>
            </Card>
          ))
        }
      </div>
    </Container>
  )
}