import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
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
      <Link
        key={id}
        to={`/tablet/${id}`}
      >
        {id}
      </Link>
    ))
    : []

  return (
    <div>
      <div className={styles.tabletsList}>
        { tablets }
      </div>
      <button onClick={onCreateTablet}>
        Создать планшет
      </button>
    </div>
  )
}
