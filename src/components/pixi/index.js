import React, {useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import app from '~/components/pixi/app'
import IconFactory from '~/components/pixi/utils/IconFactory';
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'
import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'

const graphics = new PIXI.Graphics()

const iconFactory = new IconFactory(app)

export default () => {
  const canvas = useRef()

  useEffect(() => {
    iconFactory.add(art, 100, 50, 0xFF0000)
    iconFactory.add(light, 200, 100, 0xFF0000)
    iconFactory.add(medium, 300, 300, 0x00FF00)
    iconFactory.add(heavy, 400, 50, 0x00FF00)

    canvas.current.appendChild(app.view)
  }, [])

  return (<div ref={canvas}></div>)
}

