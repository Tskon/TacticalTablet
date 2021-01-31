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
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  },
  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  },
  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
}

const addIcon = (img) => {
  const icon = sprite(img)
  icon.interactive = true
  icon.buttonMode = true
  icon.anchor.set(0.5, 0.5)
  icon
    .on('pointerdown', dragNDrop.onDragStart)
    .on('pointerup', dragNDrop.onDragEnd)
    .on('pointerupoutside', dragNDrop.onDragEnd)
    .on('pointermove', dragNDrop.onDragMove)

  app.stage.addChild(icon)
}

export default () => {
  const canvas = useRef()

  useEffect(() => {
    addIcon(art)
    addIcon(light)
    addIcon(medium)
    addIcon(heavy)

    document.getElementById('pixi-container').appendChild(app.view)
    // canvas.appendChild(app.view)
  }, [])

  return (
    <div ref={canvas} id="pixi-container"></div>
  )
}

