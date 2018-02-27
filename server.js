const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
var five = require("johnny-five");
var board = new five.Board();

const port = 4001

const app = express()

const server = http.createServer(app)
app.use(express.static('public'));


const io = socketIO(server)
console.log("start");
board.on("ready", function() {
  var relai1 = new five.Led(2);
  var relai2 = new five.Led(3);
  io.on('connection', socket => {

    socket.on('change color', (color) => {
      console.log('Color Changed to: ', color)
      io.sockets.emit('change color', color)
    })

    socket.on('led picker', (led) => {
      console.log('led selected to: ', led)
      io.sockets.emit('change led', led)
      if(led == 3){
        relai1.on();
        relai2.off();
      }else{
        relai1.off();
        relai2.on();
      }
    })
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`))	