import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import Pixi from '~/components/pixi'
import jsCookie from 'js-cookie'
import copyToClipboard from '~/services/copyToClipboard'
import {setIconData} from '~/store/tabletDataSlice'
import getTablet from '~/services/api/getTablet'
import connectToTabletSocket from '~/services/api/connectToTabletSocket'

const updateTabletsInCookies = (currentTabletId) => {
  const tabletsCookie = jsCookie.get('tablets')
  const tablets = tabletsCookie ? JSON.parse(tabletsCookie) : []
  const resultList = tablets.includes(currentTabletId) ? tablets : [...tablets, currentTabletId]
  jsCookie.set('tablets', resultList, {expires: +process.env.EXPIRE_PERIOD})
}

const Tablet = ({slug}) => {
  const dispatch = useDispatch()

  const [tabletIds, setTabletIds] = useState({})
  const [aspectRatio, setAspectRatio] = useState(null)

  useEffect(async () => {
    const data = await getTablet(slug)
    if (data) {
      const {icons, editId, viewId, aspectRatio} = data
      setTabletIds({editId, viewId})
      setAspectRatio(aspectRatio)
      if (icons && icons.length) {
        icons.forEach(icon => {
          dispatch(setIconData({data: icon}))
        })
      }
      connectToTabletSocket(viewId)
    }

    updateTabletsInCookies(slug)
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
      {aspectRatio && <Pixi aspectRatio={aspectRatio}/>}
    </div>
  )
}

Tablet.propTypes = {
  slug: PropTypes.string,
}

export default Tablet
