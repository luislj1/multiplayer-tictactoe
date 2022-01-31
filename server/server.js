const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()

app.use(cors)

const server = http.createServer(app)

const socket = require('socket.io')
const io = socket(server, {
  cors: {
    origin: "*"
  }
})

let rooms = [{
  room: "room 1",
  players: 0
}, {
  room: "room 2",
  players: 0
}, {
  room: "room 3",
  players: 0
}, {
  room: "room 4",
  players: 0
}, {
  room: "room 5",
  players: 0
}, {
  room: "room 6",
  players: 0
}]

io.on('connection', (client) => {

  client.emit('get rooms', rooms)

  client.on('disconnecting', () =>{
    client.rooms.forEach(cliroom => {
      rooms.forEach((room, index) => {
        if(cliroom === room.room){
          if(rooms[index].players > 0){
            --rooms[index].players
            io.to(rooms[index].room).emit('left room')
            io.emit('lobby change', rooms)
          }
        }
      });
    });
  })

  client.on('join room', (joined) =>{

    // update player count
    const roomIndex = rooms.findIndex((room) => room.room === joined)
    ++rooms[roomIndex].players

    client.join(joined)

    rooms[roomIndex].players === 1 ? client.emit('join room', {rooms, id: 1}) : client.emit('join room', {rooms, id: 2})

    //return updated rooms list
    io.emit('lobby change', rooms)

    if(rooms[roomIndex].players === 2){
      io.to(joined).emit('game started', joined)
    }

  })

  client.on('leave room', (left) =>{
    // update player count
    const roomIndex = rooms.findIndex((room) => room.room === left)
    --rooms[roomIndex].players

    rooms[roomIndex].players === 1 ? io.to(left).emit('left room') : false

    // disconnect the user from the room
    client.leave(left)

    //return updated rooms list
    io.emit('lobby change', rooms)

  })

  client.on('user played', (played) =>{
    io.to(played.room).emit('user played', played)
  })

  client.on('game ended', (ended) =>{

    const roomIndex = rooms.findIndex((room) => room.room === ended.room)
    --rooms[roomIndex].players

    io.to(ended.room).emit('game ended', ended.name)

    client.leave(ended.room)

    //return updated rooms list
    setTimeout(() =>{
      io.emit('lobby change', rooms)
    }, 3000)

  })

})
  
server.listen(3005, () => console.log("Server running!"))