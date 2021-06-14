import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Pixi from '~/components/pixi'
import jsCookie from 'js-cookie'
import {connectToWebSocket} from '~/services/ws'
import copyToClipboard from '~/services/copyToClipboard'
import {fetchListFromCookie} from '~/store/tabletListSlice'

function Tablet({slug}) {
  const dispatch = useDispatch()
  const {list: tabletList} = useSelector(state => state.tabletList)

  const [tabletIds, setTabletIds] = useState({})

  useEffect(async () => {
    axios.get( `${process.env.API_URL}/createWs`, {
      params: {
        tabletId: slug
      }
    }).then(connectToWebSocket(slug))

    const {data, status} = await axios.get(`${process.env.API_URL}/tablet?id=${slug}`)

    if (status === 200) {
      setTabletIds(data)
    }
  }, [])

  useEffect(() => {
    if (!tabletList) {
      dispatch(fetchListFromCookie())
      return
    }
    const resultList = tabletList.includes(slug) ? tabletList : [...tabletList, slug]
    jsCookie.set('tablets', resultList, {expires: +process.env.EXPIRE_PERIOD})
  }, [tabletList])

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
