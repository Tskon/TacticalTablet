import React, {useEffect} from 'react'
import * as PIXI from 'pixi.js'
console.log(PIXI)

const app = new PIXI.Application({width: window.innerWidth - 10, height: window.innerHeight - 150})

export default () => {
  useEffect(() => {
    document.getElementById('pixi-container').appendChild(app.view)
  }, [])

  return (
    <div id="pixi-container"></div>
  )
}

