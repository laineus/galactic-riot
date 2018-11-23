import Fighter from './Fighter'
import Laser from './Laser'
import { weaponFind } from '../config/variables'
export default class OnlineFighter extends Fighter {
  constructor (connection, id) {
    super()
    Object.setPrototypeOf(this, OnlineFighter.prototype)
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
  mainAction () {
    new Laser(this, weaponFind(1))
  }
  damage (damage) {
    this.explosion(1)
    this.connection.commit('hit', { id: this.id, damage: damage })
    if (!this.isActive) {
      this.dead()
    }
  }
}
