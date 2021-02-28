import React from 'react'
import Wrapper from '~/components/pixi/Wrapper'
import CanvasWrapper from '~/components/pixi/CanvasWrapper'
import Panel from './Panel'

import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'

const icons = [light, medium, heavy, art, light, medium, heavy, art, light, medium, heavy, art]

export default () => {
  return (
    <Wrapper>
      <CanvasWrapper></CanvasWrapper>
      <Panel icons={icons}></Panel>
    </Wrapper>
  )
}

