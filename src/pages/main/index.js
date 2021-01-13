import React from 'react'
import createTablet from '~/common/js/createTablet'

export default function Main() {
  return (
    <button onClick={createTablet}>
      Создать планшет
    </button>
  )
}