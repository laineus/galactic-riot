const randInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min
export default class Player {
  constructor (connection) {
    this.connection = connection
    this.id = randInt(1000000, 9999999)
    connection.on('message', message => {
      const data = JSON.parse(message.utf8Data)
      if (data.method === 'playerData') this.setPosition(data.body.x, data.body.y)
    })
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
}
