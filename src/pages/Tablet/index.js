import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Pixi from '~/components/pixi'
import jsCookie from 'js-cookie'
import {webSocket} from '~/services/clientWS'
import copyToClipboard from '~/services/copyToClipboard'
import {setIconData} from '~/store/tabletDataSlice'

function Tablet({slug}) {
  const dispatch = useDispatch()

  const [tabletIds, setTabletIds] = useState({})

  useEffect(async () => {
    const {data, status} = await axios.get(`${process.env.API_URL}/tablet?id=${slug}`)
    if (status === 200) {
      const {icons, editId, viewId} = data
      setTabletIds({editId, viewId})
      if (icons && icons.length) {
        icons.forEach(icon => {
          dispatch(setIconData({data: icon}))
        })
      }
      await axios.get( `${process.env.API_URL}/createWs`, {params: {tabletId: viewId}})
      webSocket.initWebSocket(viewId)
    }

    const tabletsCookie = jsCookie.get('tablets')
    const tablets = tabletsCookie ? JSON.parse(tabletsCookie) : []
    const resultList = tablets.includes(slug) ? tablets : [...tablets, slug]
    jsCookie.set('tablets', resultList, {expires: +process.env.EXPIRE_PERIOD})
  }, [])

  const tabletShareLinks = Object.values(tabletIds).map(id => {
    const isEditId = /^edit-/.test(id)

    return (
      <button
        key={id}
        rel="noreferrer"
        onClick={() => {
          copyToClipboard(`${document.location.origin}/tablet/${id}`)
        }}
      >
        {isEditId ? 'Поделиться с админом' : 'Поделиться с пользователем'}
      </button>
    )
  })

  return (
    <div>
      <h2>Страница планшета</h2>
      <div>
        {tabletShareLinks}
      </div>
      <Pixi/>
    </div>
  )
}

Tablet.propTypes = {
  slug: PropTypes.string,
}

export default Tablet
