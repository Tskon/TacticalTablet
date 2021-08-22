import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import {fetchListFromCookie} from '~/store/tabletListSlice'
import NewTablet from '~/pages/main/components/NewTablet'
import styles from './index.scss'

export default function Main() {
  const dispatch = useDispatch()
  const {list} = useSelector(state => state.tabletList)


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

      <NewTablet className={styles.newTabletWrapper}/>
    </div>
  )
}
