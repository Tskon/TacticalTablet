import React, {useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import createTablet from '~/common/js/createTablet'
import jsCookie from 'js-cookie';

export default function Main() {
  const history = useHistory()

  async function onCreateTablet() {
    const {status, editId} = await createTablet()
    if (status === 'ok') return history.push(`/tablet/${editId}`)
  }

  let tabletsList = []

  useEffect(() => {
    const tabletsCookie = jsCookie.get('tablets')
    if (tabletsCookie) {
      tabletsList = JSON.parse(tabletsCookie)
    }
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
