import {createServer} from 'http'
import {parse} from 'url'
import WebSocket from 'ws'
import {iconHandler} from './wsEntities/icon.js'

const httpServer = createServer()
const serversList = {}

function createWebSocketServer(wsId) {
  if (wsId in serversList) return
  serversList[wsId] = new WebSocket.Server({noServer: true})
  serversList[wsId].on('connection', (ws, req) => {
    console.log(`REQUEST URL: ${req.url}`, '\n', 'WS: connected')
    ws.on('message', function incoming(message) {
      serversList[wsId].clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })

      try {
        const data = JSON.parse(message)
        if (data.icon) {
          iconHandler(data.icon, wsId)
        }
      } catch {
        console.log('ws message have incorrect format (json required)')
      }
    })
  })
}

httpServer.on('upgrade', function upgrade(request, socket, head) {
  const {pathname} = parse(request.url)

  if (!pathname) {
    socket.destroy()
    return
  }
  createWebSocketServer(pathname)
  const wss = serversList[pathname]
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request)
  })
})

httpServer.listen(4321)

export default createWebSocketServer
