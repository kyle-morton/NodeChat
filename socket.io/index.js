let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected!');
  socket.broadcast.emit('hello!'); //send message to all clients

  /** 
   * On message received, emit to all clients
   */
  socket.on('chat message', (msg) => {    
    io.emit('chat message', msg);
  });

  /**
   * On client disconnect, log it
   */
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});