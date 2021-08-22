import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import createTablet from '~/common/js/createTablet'
import {fetchListFromCookie} from '~/store/tabletListSlice'
import styles from './index.scss'

export default function Main() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {list} = useSelector(state => state.tabletList)

  async function onCreateTablet() {
    const {status, editId} = await createTablet()
    if (status === 'ok') return history.push(`/tablet/${editId}`)
  }

  useEffect(() => {
    dispatch(fetchListFromCookie())
  }, [])

  const tablets = list
    ? list.map(id => (
      <li key={id}>
        <Link to={`/tablet/${id}`}>
          {id}
        </Link>
      </li>
    ))
    : []

  return (
    <div className={styles.wrapper}>
      <Card className={styles.tabletListWrapper}>
        <CardHeader
          title="Мои планшеты"
          subheader="Ранее открытые планшеты"
        />
        <CardContent>
          <ul className={styles.tabletList}>
            { tablets }
          </ul>
        </CardContent>
      </Card>

      <Card className={styles.newTabletWrapper}>
        <CardHeader
          title="Новый планшет"
        />

        <CardContent>
          <TextField
            className={styles.newTabletInput}
            fullWidth
            label="Заголовок"
          />
          <div>
            <div className={styles.newTabletAspectRatioTitle}>
              Соотношение сторон:
            </div>
            <div className={styles.newTabletAspectRatio}>
              <TextField
                className={styles.newTabletInput}
                label="Ширина"
                variant="outlined"
                size="small"
                type="number"
              />
              <TextField
                className={styles.newTabletInput}
                label="Высота"
                variant="outlined"
                size="small"
                type="number"
              />
            </div>
          </div>

        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={onCreateTablet}
          >
            Создать планшет
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
