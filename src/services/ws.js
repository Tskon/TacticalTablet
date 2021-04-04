const socket = new WebSocket('ws://127.0.0.1:4321')

socket.onopen = () => {
  console.log('WS: Connection success');
}

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log('WS: Connection closed clear');
  } else {
    console.log('WS: Connection closed with error');
  }
  console.log('WS: Code - ' + event.code + ' reason - ' + event.reason);
}

socket.onmessage = (event) => {
  console.log('WS: Data received - ' + event.data);
}

socket.onerror = (error) => {
  console.log('WS: Error - ' + error.message);
}


export default socket
