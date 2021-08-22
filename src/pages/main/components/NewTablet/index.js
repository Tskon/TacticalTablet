import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import createTablet from '~/common/js/createTablet'
import styles from './index.scss'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card'
import {useHistory} from 'react-router-dom'

export default function NewTablet() {
  const history = useHistory()

  const [title, setTitle] = useState('Тактический планшет')
  const titleHandler = (e) => {setTitle(e.target.value)}

  const [aspectWidth, setAspectWidth] = useState(16)
  const aspectWidthHandler = (e) => {setAspectWidth(Number(e.target.value))}

  const [aspectHeight, setAspectHeight] = useState(9)
  const aspectHeightHandler = (e) => {setAspectHeight(Number(e.target.value))}

  async function onCreateTablet() {
    const {status, editId} = await createTablet({
      title,
      aspectRatio: aspectWidth / aspectHeight
    })
    if (status === 'ok') return history.push(`/tablet/${editId}`)
  }

  return (
    <form onSubmit={onCreateTablet}>
      <Card className={styles.newTablet}>
        <CardHeader title="Новый планшет" />

        <CardContent>
          <TextField
            className={styles.input}
            fullWidth
            label="Заголовок"
            value={title}
            onInput={titleHandler}
          />
          <div>
            <div className={styles.aspectRatioTitle}>
              Соотношение сторон:
            </div>
            <div className={styles.aspectRatio}>
              <TextField
                className={styles.input}
                label="Ширина"
                variant="outlined"
                size="small"
                type="number"
                value={aspectWidth}
                onInput={aspectWidthHandler}
              />
              <TextField
                className={styles.input}
                label="Высота"
                variant="outlined"
                size="small"
                type="number"
                value={aspectHeight}
                onInput={aspectHeightHandler}
              />
            </div>
          </div>
        </CardContent>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Создать планшет
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
