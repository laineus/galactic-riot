import Player from './Player'
import rooms from './rooms'
const MAX = 12
const FPS = 30
const TIME = 120
export default class Room {
  constructor () {
    this.players = []
    this.resetGame()
    this.loop()
  }
  resetGame () {
    this.westKill = 0
    this.eastKill = 0
    this.frame = TIME * FPS
  }
  join (connection) {
    if (this.full) return
    const player = new Player(connection, this, this.dicideTeam())
    this.players.push(player)
  }
  leave (connection) {
    const i = this.players.findIndex(p => p.connection === connection)
    if (i >= 0) this.players.splice(i, 1)
    if (this.empty) this.remove()
  }
  get time () {
    return Math.round(this.frame / FPS)
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
  get isActive () {
    return this.frame > 0
  }
  loop () {
    this.update()
    setTimeout(this.loop.bind(this), 1000 / FPS)
  }
  update () {
    if (!this.isActive) return
    this.frame--
    this.commitToAll('update', { players: this.players.map(p => p.state), time: this.time, westKill: this.westKill, eastKill: this.eastKill })
    if (!this.isActive) {
      this.commitToAll('end', { westKill: this.westKill, eastKill: this.eastKill })
      setTimeout(() => {
        this.players.forEach(p => p.connection.close())
        this.remove()
      }, 5000)
    }
  }
  commitToAll (methodName, data) {
    this.players.forEach(p => p.connection.commit(methodName, data))
  }
  remove () {
    const i = rooms.findIndex(r => r === this)
    if (i >= 0) rooms.splice(i, 1)
  }
}
