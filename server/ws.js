import WebSocket from 'ws'

const wss = new WebSocket.Server({port: 4321})

wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach((client) => {
      console.log(client)
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('something');
});
