import {setAnotherPointerCoords} from '~/store/wsDataSlice'
let socket = null

function connectToWebSocket(tabletId) {
  socket = new WebSocket(`ws://127.0.0.1:4321/${tabletId}`)

  socket.onopen = () => {
    console.log('WS: Connection success')
  }

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log('WS: Connection closed clear')
    } else {
      console.log('WS: Connection closed with error')
    }
    console.log('WS: Code - ' + event.code + ' reason - ' + event.reason)
  }

  socket.onmessage = (event) => {
    console.log('WS: Data received - ' + event.data)
    const data = JSON.parse(event.data)
    if (data.pointer) {
      $store.dispatch(setAnotherPointerCoords(data.pointer))
    }
  }

  socket.onerror = (error) => {
    console.log('WS: Error - ' + error.message)
  }

  socket.sendString = (data) => {
    socket.send(JSON.stringify(data))
  }
}

const iconActions = {
  create: 'create',
  update: 'update'
}

export {connectToWebSocket, socket, iconActions}
