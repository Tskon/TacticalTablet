import WebSocket from 'ws'

const wss = new WebSocket.Server({port: 4321})

wss.on('connection', (ws) => {
  console.log('WS: connected')
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(message)
        client.send(message);
      }
    });
  });

  ws.send('something');
});
