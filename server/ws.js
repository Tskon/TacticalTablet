import WebSocket from 'ws'

const wss = new WebSocket.Server({port: 4321})

wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
