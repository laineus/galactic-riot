import Fighter from './Fighter'
export default class OnlinePlayer extends Fighter {
  constructor (connection, id) {
    super()
    Object.setPrototypeOf(this, OnlinePlayer.prototype)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setType()
    this.connection = connection
    this.id = id
  }
  update (app) {
    super.update(app)
  }
  setType () {
    super.setType('enemy')
    this.setColorIndex(3)
    return this
  }
  damage (damage) {
    this.explosion(1)
    this.connection.commit('hit', { id: this.id, damage: damage })
    if (!this.isActive) {
      this.dead()
    }
  }
}
