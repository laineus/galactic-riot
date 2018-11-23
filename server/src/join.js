import rooms from './rooms'
import Room from './Room'
export default connection => {
  const availableRoom = rooms.find(room => !room.full)
  const room = availableRoom || new Room
  if (!availableRoom) rooms.push(room)
  room.join(connection)
  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Disconnected. Reson: [${reasonCode}] ${description}`)
    rooms.forEach(r => r.leave(connection))
  })
}
