import React, {useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'
import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'

const sprite = PIXI.Sprite.from

const sprites = {
  art: sprite(art),
  light: sprite(light),
  medium: sprite(medium),
  heavy: sprite(heavy),
}

const app = new PIXI.Application({
  width: window.innerWidth - 10,
  height: window.innerHeight - 150,
  antialias: true,
  transparent: false,
  resolution: 1,
  autoResize: true,
  backgroundColor: 0x061639,
})

export default () => {
  const canvas = useRef()

  useEffect(() => {
    app.stage.addChild(sprites.art)
    app.stage.addChild(sprites.light)
    app.stage.addChild(sprites.medium)
    app.stage.addChild(sprites.heavy)

    document.getElementById('pixi-container').appendChild(app.view)
    // canvas.appendChild(app.view)
  }, [])

  return (
    <div ref={canvas} id="pixi-container"></div>
  )
}

