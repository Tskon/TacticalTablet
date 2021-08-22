import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import {setList} from '~/store/tabletListSlice'
import NewTablet from '~/pages/Main/components/NewTablet'
import getTablets from '~/services/api/getTablets'
import styles from './index.scss'

export default function Main() {
  const dispatch = useDispatch()
  const {editList, viewList} = useSelector(state => state.tabletList)

  useEffect(async () => {
    dispatch(setList(await getTablets()))
  }, [])

  const editTablets = editList.map(tablet => (
    <li key={tablet.editId}>
      <Link to={`/tablet/${tablet.editId}`}>
        {tablet.title}
      </Link>
    </li>
  ))

  const viewTablets = viewList.map(tablet => (
    <li key={tablet.viewId}>
      <Link to={`/tablet/${tablet.viewId}`}>
        {tablet.title}
      </Link>
    </li>
  ))

  return (
    <div className={styles.wrapper}>
      <Card className={styles.tabletListWrapper}>
        <CardHeader
          title="Список планшетов"
          subheader="Ранее открытые планшеты"
        />
        <CardContent>
          <ul className={styles.tabletList}>
            Мои планшеты:
            { editTablets }
          </ul>
          <ul className={styles.tabletList}>
            Просмотренные планшеты:
            { viewTablets }
          </ul>
        </CardContent>
      </Card>

      <NewTablet className={styles.newTabletWrapper}/>
    </div>
  )
}
