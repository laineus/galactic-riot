import randInt from './randInt'
import parseData from './parseData'
export default class Player {
  constructor (connection) {
    this.connection = connection
    this.id = randInt(1000000, 9999999)
    this.send('id', this.id)
    connection.on('message', this.received.bind(this))
    this.setState({ fighter: 1, x: 0, y: 0, r: 0, hp: 100 })
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
  }
  send (methodName, data) {
    this.connection.sendUTF(JSON.stringify({ method: methodName, body: data }))
  }
}
