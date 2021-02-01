import React, {useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import app from './app'
import Panel from './Panel';

import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'

const icons = [light, medium, heavy, art, light, medium, heavy, art, light, medium, heavy, art]
new Panel(app, icons)

export default () => {
  const canvas = useRef()

  useEffect(() => {
    canvas.current.appendChild(app.view)
  }, [])

  return (<div ref={canvas}></div>)
}

