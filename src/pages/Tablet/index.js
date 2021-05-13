import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import jsCookie from 'js-cookie'
import Pixi from '~/components/pixi'
import axios from 'axios'
import {connectToWebSocket} from '~/services/ws.js'

function Tablet({slug}) {
  useEffect(() => {
    const tabletsCookie = jsCookie.get('tablets')
    const tabletsList = tabletsCookie ? JSON.parse(tabletsCookie) : []

    if (!tabletsList.includes(slug)) {
      tabletsList.push(slug)
    }
    jsCookie.set('tablets', tabletsList, {expires: +process.env.EXPIRE_PERIOD})
    axios.get('http://localhost:9988/api/createWs', {
      params: {
        tabletId: slug
      }
    }).then(connectToWebSocket(slug))
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
