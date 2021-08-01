import {setAnotherPointerCoords} from '~/store/wsDataSlice'

const webSocket = {
  socket: null,
  id: null,

  initWebSocket(id) {
    if (id) this.id = id
    this.socket = new WebSocket(`ws://127.0.0.1:4321/${this.id}`)
    this.socket.onopen = this.onOpen
    this.socket.onerror = this.onError
    this.socket.onclose = this.onClose
    this.socket.onmessage = this.onMessage
  },

  onOpen() { console.log(`WS: Connection success, id: ${this.id}`) },
  onClose(event) {
    if (event.wasClean) {
      console.log('WS: Connection closed clear')
    } else {
      console.log('WS: Connection closed with error, trying reconnect')
      this.initWebSocket()
    }
    console.log('WS: Code - ' + event.code + ' reason - ' + event.reason)
  },
  onError(error) { console.log('WS: Error - ' + error.message) },
  onMessage(event) {
    console.log('WS: Data received - ' + event.data)
    const data = JSON.parse(event.data)
    if (data.pointer) {
      $store.dispatch(setAnotherPointerCoords(data.pointer))
    }
  },

  waitForConnection(callback, interval) {
    if (this.socket && this.socket.readyState === 1) {
      callback()
      return
    }
    setTimeout(() => {
      this.waitForConnection(callback, interval)
    }, interval)
  },

  send(data) {
    this.waitForConnection(() => {
      this.socket.send(JSON.stringify(data))
    }, 300)
  }
}

const iconActions = {
  create: 'create',
  update: 'update'
}

export {webSocket, iconActions}
