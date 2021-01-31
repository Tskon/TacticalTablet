import React, {useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'
import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'

const sprite = PIXI.Sprite.from

const app = new PIXI.Application({
  width: window.innerWidth - 10,
  height: window.innerHeight - 150,
  antialias: true,
  transparent: false,
  resolution: 1,
  autoResize: true,
  backgroundColor: 0x061639,
})

const dragNDrop = {
  onDragStart(event) {
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
  },
  onDragEnd() {
    this.alpha = 1
    this.dragging = false
    this.data = null
    // TODO save coords from this.x / this.y
  },
  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent)
      this.x = newPosition.x
      this.y = newPosition.y
      // TODO periodically save coords from newPosition.x / newPosition.y
    }
  }
}

const addIcon = (img, x = 0, y = 0, color) => {
  const icon = sprite(img)
  icon.interactive = true
  icon.buttonMode = true
  icon.anchor.set(0.5, 0.5)
  icon
    .on('pointerdown', dragNDrop.onDragStart)
    .on('pointerup', dragNDrop.onDragEnd)
    .on('pointerupoutside', dragNDrop.onDragEnd)
    .on('pointermove', dragNDrop.onDragMove)
  icon.x = x
  icon.y = y
  if (color) icon.tint = color

  app.stage.addChild(icon)
}

export default () => {
  const canvas = useRef()

  useEffect(() => {
    addIcon(art, 100, 50, 0xFF0000)
    addIcon(light, 200, 100, 0xFF0000)
    addIcon(medium, 300, 300, 0x00FF00)
    addIcon(heavy, 400, 50, 0x00FF00)

    document.getElementById('pixi-container').appendChild(app.view)
    // canvas.appendChild(app.view)

    setInterval(() => {console.log(app)}, 10000)
  }, [])

  return (
    <div ref={canvas} id="pixi-container"></div>
  )
}

