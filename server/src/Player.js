import randInt from './randInt'
import parseData from './parseData'
export default class Player {
  constructor (connection, room, team) {
    connection.commit = (methodName, data) => connection.sendUTF(JSON.stringify({ method: methodName, body: data }))
    this.connection = connection
    this.room = room
    this.team = team
    this.id = randInt(1000000, 9999999)
    connection.commit('init', { id: this.id, team: this.team })
    connection.on('message', this.received.bind(this))
    this.setState({ fighter: 0, x: 0, y: 0, r: 0, hp: 100 })
    return this
  }
  setState (state) {
    this.fighter = state.fighter
    this.x = state.x
    this.y = state.y
    this.r = state.r
    this.hp = state.hp
    return this
  }
  get state () {
    return {
      id: this.id,
      team: this.team,
      fighter: this.fighter,
      x: this.x,
      y: this.y,
      r: this.r,
      hp: this.hp
    }
  }
  received (message) {
    const data = parseData(message)
    if (data.method === 'playerData') this.setState(data.body)
    if (!this.room.isActive) return
    if (data.method === 'hit') {
      const target = this.room.players.find(p => p.id === data.body.id)
      if (target) target.connection.commit('hit', { damage: data.body.damage, shooter: this.id })
    }
    if (data.method === 'laser') {
      this.commitToOtherPlayer('laser', this.id)
    }
    if (data.method === 'dead') {
      this.hp = 0
      this.team === 0 ? this.room.westKill++ : this.room.eastKill++
      this.commitToOtherPlayer('dead', { id: this.id, shooter: data.body })
    }
  }
  commitToOtherPlayer (methodName, data) {
    this.room.players.forEach(p => {
      if (p !== this) p.connection.commit(methodName, data)
    })
  }
}
