import {Graphics} from 'pixi.js';
import IconFactory from './IconFactory';

const graphics = new Graphics()

export default class Panel {
  constructor(app, icons = [], options = {}) {
    const {panelWidth, iconSize, gap, rowCount} = options
    this.app = app
    this.icons = icons
    this.panelWidth = panelWidth || 300
    this.iconSize = iconSize || 100
    this.gap = gap || 10
    this.rowCount = rowCount || 3

    this.iconFactory = new IconFactory(app)
    this.init()
  }

  init() {
    const {width, height} = this.app.screen
    graphics.lineStyle(2, 0x666666, 1);
    graphics.beginFill(0x999999);
    graphics.drawRect(width - this.panelWidth, 0, this.panelWidth, height);
    graphics.endFill();
    this.app.stage.addChild(graphics)

    this.icons.forEach((icon, i) => {
      const kx = (i % 3) * this.iconSize + (this.iconSize/2) + this.gap
      const ky = (Math.floor(i/3) * this.iconSize) + (this.iconSize/2) + this.gap
      this.iconFactory.addButton(icon, width - this.panelWidth + kx, ky, this.iconSize, this.iconSize)
    })
  }
}
