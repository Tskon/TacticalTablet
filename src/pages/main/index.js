import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
import createTablet from '~/common/js/createTablet'
import {fetchListFromCookie} from '~/store/TabletListSlice'

export default function Main() {
  const dispatch = useDispatch()
  const history = useHistory()

  async function onCreateTablet() {
    const {status, editId} = await createTablet()
    if (status === 'ok') return history.push(`/tablet/${editId}`)
  }

  let tabletsList = []

  useEffect(() => {
    dispatch(fetchListFromCookie())
  }, [])

  const tablets = tabletsList.map(id => <Link to={`/tablet/${id}`}/>)

  return (
    <div>
      <div className="tablets-list">
        { tablets }
      </div>
      <button onClick={onCreateTablet}>
        Создать планшет
      </button>
    </div>
  )
}
