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

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
