import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import jsCookie from 'js-cookie'
import Pixi from '~/components/pixi'

function Tablet({slug}) {
  useEffect(() => {
<<<<<<< HEAD
    const tabletsList = cookies.get('tablets') ? JSON.parse(cookies.get('tablets')) : []
=======
    const cookies = jsCookie.get('tablets')
    const tabletsList = JSON.parse(cookies)
>>>>>>> a5f14fbe4403a7232e3252c2f0916fe50722ddd6
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
