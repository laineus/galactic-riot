import rooms from './rooms'
export default connection => {
  rooms.push(connection)
  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Disconnected. Reson: [${reasonCode}] ${description}`)
  })
}
