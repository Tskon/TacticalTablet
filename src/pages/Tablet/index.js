import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import jsCookie from 'js-cookie'
import Pixi from '~/components/pixi'

function Tablet({slug}) {
  useEffect(() => {
    const cookies = jsCookie.get('tablets')
    const tabletsList = JSON.parse(cookies)
    if (!tabletsList.includes(slug)) {
      tabletsList.push(slug)
    }
    jsCookie.set('tablets', tabletsList, {expires: +process.env.EXPIRE_PERIOD})

    const socket = new WebSocket('ws://127.0.0.1:4321')

    socket.onopen = function() {
      console.log('Соединение установлено.');
      socket.send('hello mf!')
    }

    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }

    socket.onmessage = function(event) {
      console.log('Получены данные ' + event.data);
    }

    socket.onerror = function(error) {
      console.log('Ошибка ' + error.message);
    }
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
