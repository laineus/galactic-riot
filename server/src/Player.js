import randInt from './randInt'
import parseData from './parseData'
export default class Player {
  constructor (connection) {
    this.connection = connection
    this.id = randInt(1000000, 9999999)
    this.send('id', this.id)
    connection.on('message', this.received.bind(this))
    this.setPosition(0, 0)
    return this
  }
  setPosition (x, y) {
    this.x = x
    this.y = y
    return this
  }
  get returnData () {
    return { id: this.id, x: this.x, y: this.y }
  }
  received (message) {
    const data = parseData(message)
    if (data.method === 'playerData') this.setPosition(data.body.x, data.body.y)
  }
  send (methodName, data) {
    this.connection.sendUTF(JSON.stringify({ method: methodName, body: data }))
  }
}
