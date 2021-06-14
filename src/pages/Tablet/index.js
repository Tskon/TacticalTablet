import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Pixi from '~/components/pixi'
import jsCookie from 'js-cookie'
import {connectToWebSocket} from '~/services/ws.js'
import {fetchListFromCookie} from '~/store/tabletListSlice'

function Tablet({slug}) {
  const dispatch = useDispatch()
  const {list: tabletList} = useSelector(state => state.tabletList)

  useEffect(() => {
    axios.get( `${process.env.API_URL}/createWs`, {
      params: {
        tabletId: slug
      }
    }).then(connectToWebSocket(slug))

    axios.get(`${process.env.API_URL}/tablet?id=${slug}`)
  }, [])

  useEffect(() => {
    if (!tabletList) {
      dispatch(fetchListFromCookie())
      return
    }
    const resultList = tabletList.includes(slug) ? tabletList : [...tabletList, slug]
    jsCookie.set('tablets', resultList, {expires: +process.env.EXPIRE_PERIOD})
  }, [tabletList])

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
