import WebSocket from 'ws'
import {iconHandler} from './wsEntities/icon.js'

const serversList = {}

function createWebSocketServer(wsId) {
  if (wsId in serversList) return

  serversList[wsId] = new WebSocket.Server({port: 4321, path: `/${wsId}`})
  serversList[wsId].on('connection', (ws, req) => {
    console.log('REQUEST URL:', req.url)
    console.log('WS: connected')
    ws.on('message', function incoming(message) {
      serversList[wsId].clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })

      try {
        const data = JSON.parse(message)
        if (data.icon) {
          iconHandler(data.icon)
        }
      } catch {
        console.log('ws message have incorrect format (json required)')
      }
    })
  })
}

export default createWebSocketServer
