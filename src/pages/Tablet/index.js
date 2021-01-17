import React, {useEffect} from 'react'
import cookies from 'js-cookie'

export default function Tablet({slug}) {
  useEffect(() => {
    const tabletsList = JSON.parse(cookies.get('tablets')) || []
    if (!tabletsList.includes(slug)) {
      tabletsList.push(slug)
    }
    cookies.set('tablets', tabletsList, {expires: +process.env.EXPIRE_PERIOD})
  }, [])

  return (
    <div>
      <h2>Страница планшета {slug}</h2>
    </div>
  )
}