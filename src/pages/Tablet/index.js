import React, {useEffect} from 'react'
import jsCookie from 'js-cookie'

import Pixi from '~/components/pixi'


export default function Tablet({slug}) {
  useEffect(() => {
    const cookies = jsCookie.get('tablets')
    const tabletsList = JSON.parse(cookies)
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
