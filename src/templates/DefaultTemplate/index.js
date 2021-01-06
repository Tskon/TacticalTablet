import React from 'react'
import './index.scss'

export default function DefaultTemplate(props) {
  return (
    <div>
      <header className="header">
        <h1 className="title">Тактический планшет</h1>
      </header>
      {props.children}
    </div>
  )
}