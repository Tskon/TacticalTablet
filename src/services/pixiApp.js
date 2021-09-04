import {Application} from 'pixi.js'

export default (width, height) => {
  return new Application({
    width,
    height,
    antialias: true,
    transparent: false,
    resolution: 1,
    autoResize: true,
    backgroundColor: 0x061639,
  })
}
