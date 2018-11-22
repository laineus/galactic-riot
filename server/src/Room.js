import Player from './Player'
const MAX = 2
const FPS = 30
export default class Room {
  constructor () {
    this.players = []
    this.loop()
  }
  join (connection) {
    if (this.full) return
    const player = new Player(connection)
    this.players.push(player)
  }
  leave (connection) {
    const i = this.players.findIndex(p => p.connection === connection)
    if (i) this.players.splice(i, 1)
  }
  get empty () {
    return this.players.length === 0
  }
  get full () {
    return this.players.length >= MAX
  }
  loop () {
    this.update()
    setTimeout(this.loop.bind(this), 1000 / FPS)
  }
  update () {
    this.sendToAll('playersData', this.players.map(p => p.state))
  }
  sendToAll (methodName, data) {
    this.players.forEach(p => p.connection.sendUTF(JSON.stringify({ method: methodName, body: data })))
  }
}
