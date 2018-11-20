const MAX = 2
const FPS = 30
export default class Room {
  constructor () {
    this.connections = []
    this.loop()
  }
  join (connection) {
    if (this.full) return
    this.connections.push(connection)
  }
  leave (connection) {
    const i = this.connections.findIndex(c => c === connection)
    if (i) this.connections.splice(i, 1)
  }
  get empty () {
    return this.connections.length === 0
  }
  get full () {
    return this.connections.length >= MAX
  }
  loop () {
    this.update()
    setTimeout(this.loop.bind(this), 1000 / FPS)
  }
  update () {
    this.sendToAll('updateData', 123)
  }
  sendToAll (methodName, data) {
    this.connections.forEach(c => c.sendUTF(JSON.stringify({ method: methodName, body: data })))
  }
}
