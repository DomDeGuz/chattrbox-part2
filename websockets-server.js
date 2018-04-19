var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = '';

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  if ('' !== topic) {
    socket.send(topic);
  }

  socket.on('message', function(data) {
    console.log('message received: ' + data);

    if (0 === data.indexOf('/topic')) {
      var topicMsg = data.replace('/topic', '').trim();
      data = '*** Topic has changed to ' + topicMsg;
      topic = '*** Topic is ' + topicMsg;
    } else {
      messages.push(data);
    }

    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });
});
