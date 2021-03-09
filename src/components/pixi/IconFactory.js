import {Sprite} from 'pixi.js'
const sprite = Sprite.from

export default class IconFactory {
  constructor(app) {
    this.app = app
  }

  add(img, size, x = 0, y = 0, color) {
    const icon = sprite(img)
    icon.interactive = true
    icon.buttonMode = true
    icon.anchor.set(0.5, 0.5)
    icon
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove)
    icon.x = x
    icon.y = y
    if (color) icon.tint = color

    this.app.stage.addChild(icon)
  }

  onDragStart(event) {
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
  }
  onDragEnd() {
    this.alpha = 1
    this.dragging = false
    this.data = null
    // TODO save coords from this.x / this.y
  }
  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent)
      this.x = newPosition.x
      this.y = newPosition.y
      // TODO periodically save coords from newPosition.x / newPosition.y
    }
  }

}
