import Player from './Player'
const MAX = 2
const FPS = 30
export default class Room {
  constructor () {
    this.players = []
    this.resetGame()
    this.loop()
  }
  resetGame () {
    this.westKill = 0
    this.eastKill = 0
  }
  join (connection) {
    if (this.full) return
    const player = new Player(connection, this, this.dicideTeam())
    this.players.push(player)
  }
  leave (connection) {
    const i = this.players.findIndex(p => p.connection === connection)
    if (i) this.players.splice(i, 1)
  }
  get west () {
    return this.players.filter(p => !p.team)
  }
  get east () {
    return this.players.filter(p => p.team)
  }
  dicideTeam () {
    const west = this.west.length === this.east.length ? this.westKill <= this.eastKill : this.west.length < this.east.length
    return west ? 0 : 1
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
    this.commitToAll('playersData', this.players.map(p => p.state))
  }
  commitToAll (methodName, data) {
    this.players.forEach(p => p.connection.commit(methodName, data))
  }
}
