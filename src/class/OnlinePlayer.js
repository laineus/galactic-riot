import Fighter from './Fighter'
export default class OnlinePlayer extends Fighter {
  constructor () {
    super()
    Object.setPrototypeOf(this, OnlinePlayer.prototype)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setType()
  }
  update (app) {
    super.update(app)
  }
  setType () {
    super.setType('enemy')
    this.setColorIndex(3)
    return this
  }
  damage () {}
}
