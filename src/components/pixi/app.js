import {Application} from 'pixi.js'

export default new Application({
  width: window.innerWidth - 10,
  height: window.innerHeight - 150,
  antialias: true,
  transparent: false,
  resolution: 1,
  autoResize: true,
  backgroundColor: 0x061639,
})
