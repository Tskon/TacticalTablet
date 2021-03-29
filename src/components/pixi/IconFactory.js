import {Sprite} from 'pixi.js'
const sprite = Sprite.from
import {v4 as uuid} from 'uuid'

export default class IconFactory {
  constructor(app) {
    this.app = app
  }

  add({img, size, x = 0, y = 0, color}, onMoveCb) {
    this.onMoveCb = onMoveCb
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
    icon.width = size
    icon.height = size
    icon.id = uuid()
    icon.onMoveCb = onMoveCb
    if (color) icon.tint = color

    this.app.stage.addChild(icon)
    return icon.id
  }

  onDragStart(event) {
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
  }
  onDragEnd() {
    if (this.onMoveCb) {
      this.onMoveCb({x: this.position.x, y: this.position.y, id: this.id})
    }

    this.alpha = 1
    this.dragging = false
    this.data = null
  }
  onDragMove() {
    if (!this.dragging) return

    const newPosition = this.data.getLocalPosition(this.parent)
    this.x = newPosition.x
    this.y = newPosition.y

    if (this.onMoveCb) {
      this.onMoveCb({x: this.position.x, y: this.position.y, id: this.id})
    }
  }

}
