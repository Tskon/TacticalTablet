import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import jsCookie from 'js-cookie'
import Pixi from '~/components/pixi'
import '~/services/ws.js'

function Tablet({slug}) {
  useEffect(() => {
    const tabletsCookie = jsCookie.get('tablets')
    const tabletsList = tabletsCookie ? JSON.parse(tabletsCookie) : []

    if (!tabletsList.includes(slug)) {
      tabletsList.push(slug)
    }
    jsCookie.set('tablets', tabletsList, {expires: +process.env.EXPIRE_PERIOD})
  }, [])

  return (
    <div>
      <h2>Страница планшета {slug}</h2>
      <Pixi/>
    </div>
  )
}

Tablet.propTypes = {
  slug: PropTypes.string,
}

export default Tablet
