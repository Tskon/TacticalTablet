import WebSocket from 'ws'

const serversList = {}

function createWebsocketServer(wsId) {
  if (wsId in serversList) return

  serversList[wsId] = new WebSocket.Server({port: 4321, path: `/${wsId}`})
  serversList[wsId].on('connection', (ws, req) => {
    console.log('REQUEST URL:', req.url)
    console.log('WS: connected')
    ws.on('message', function incoming(message) {
      console.log('received: %s', message)

      serversList[wsId].clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    })
  })

  console.log(serversList)
}

export default createWebsocketServer