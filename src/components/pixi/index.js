import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '~/components/pixi/Wrapper'
import CanvasWrapper from '~/components/pixi/CanvasWrapper'
import Panel from './Panel'

import light from '~/common/images/wot/light.png'
import medium from '~/common/images/wot/medium.png'
import heavy from '~/common/images/wot/heavy.png'
import art from '~/common/images/wot/art.png'

const icons = [light, medium, heavy, art, light, medium, heavy, art, light, medium, heavy, art]

const Pixi = ({aspectRatio}) => {
  const panelWidth = 320
  const resultWidth = window.innerWidth - panelWidth
  const resultHeight = resultWidth / aspectRatio
  console.log(resultWidth, resultHeight, aspectRatio)
  return (
    <Wrapper>
      <CanvasWrapper
        width={resultWidth}
        height={resultHeight}
      />
      <Panel
        width={panelWidth}
        icons={icons}
      />
    </Wrapper>
  )
}

Pixi.propTypes = {
  aspectRatio: PropTypes.arrayOf(PropTypes.number)
}

export default Pixi

