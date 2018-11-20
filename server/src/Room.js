const MAX = 2
export default class Room {
  constructor () {
    this.connections = []
  }
  join (connection) {
    if (this.full) return
    this.connections.push(connection)
  }
  leave (connection) {
    const i = this.connections.findIndex(c => c === connection)
    if (i) this.connections.splice(i, 1)
  }
  get full () {
    return this.connections.length >= MAX
  }
}
