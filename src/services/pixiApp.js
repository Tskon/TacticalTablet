import {Application} from 'pixi.js'

export default new Application({
  width: document.body.clientWidth - 320,
  height: document.body.clientHeight - 150,
  antialias: true,
  transparent: false,
  resolution: 1,
  autoResize: true,
  backgroundColor: 0x061639,
})
