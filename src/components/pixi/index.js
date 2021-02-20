import React, {useEffect, useRef} from 'react'
import App from './app'
import Panel from './Panel';

import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'

const icons = [light, medium, heavy, art, light, medium, heavy, art, light, medium, heavy, art]

export default () => {
  const canvas = useRef()

  useEffect(() => {
    canvas.current.appendChild(App.view)
  }, [])

  return (
    <div>
      <div ref={canvas}></div>
      <Panel icons={icons}></Panel>
    </div>
  )
}

