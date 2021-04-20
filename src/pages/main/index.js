import React from 'react'
import {useHistory} from 'react-router-dom'
import createTablet from '~/common/js/createTablet'

export default function Main() {
  const history = useHistory()

  async function onCreateTablet() {
    const {status, editId} = await createTablet()
    if (status === 'ok') return history.push(`tablet/${editId}`)
  }


  return (
    <button onClick={onCreateTablet}>
      Создать планшет
    </button>
  )
}