module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    //when client emits create or join
    socket.on('create or join', function(room) {
      console.log('create or join to room', room)
      //count number of users in room
      const currentRoom = io.sockets.adapter.rooms[room] || {length: 0}
      const numClients = currentRoom.length
      console.log(room, 'has', numClients, 'clients')

      if (numClients === 0) {
        //no one in the room
        socket.join(room)
        socket.emit('created', room)
      } else if (numClients === 1) {
        //only one user in the room
        socket.join(room)
        socket.emit('joined', room)
      } else {
        //room is full  becuase both users are in the room
        socket.emit('full', room)
      }
    })

    socket.on('add event', function(userId) {
      socket.broadcast.emit('added event', userId)
    })

    socket.on('ready', function(room) {
      socket.broadcast.to(room).emit('ready')
    })
    socket.on('candidate', function(event) {
      socket.broadcast.to(event.room).emit('candidate', event)
    })
    socket.on('offer', function(event) {
      socket.broadcast.to(event.room).emit('offer', event.sdp)
    })
    socket.on('answer', function(event) {
      socket.broadcast.to(event.room).emit('answer', event.sdp)
    })

    socket.on('closeSession', function(roomId) {
      console.log('in index socket')

      socket.emit('closeSession', roomId)
      console.log('end of socket')
    })

    socket.on('remove video', function(roomId) {
      console.log('in remove video server socket')

      socket.broadcast.to(roomId).emit('remove video', roomId)
      console.log('end of remove video on server')
    })

    socket.on('change input', inputObj => {
      socket.broadcast.emit('new input', inputObj)
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('remove video')

      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
