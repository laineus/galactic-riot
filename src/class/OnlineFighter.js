import Fighter from './Fighter'
import OnlineLaser from './OnlineLaser'
import { weaponFind } from '../config/variables'
export default class OnlineFighter extends Fighter {
  constructor (connection, id) {
    super()
    Object.setPrototypeOf(this, OnlineFighter.prototype)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.connection = connection
    this.id = id
  }
  update (app) {
    super.update(app)
  }
  setType (friend) {
    super.setType(friend ? 'friend' : 'enemy')
    this.setColorIndex(friend ? 2 : 3)
    return this
  }
  mainAction () {
    new OnlineLaser(this, weaponFind(1))
  }
  damage (damage) {
    this.explosion(1)
    this.connection.commit('hit', { id: this.id, damage: damage })
  }
  setFighter (id) {
    super.setFighter(id)
    this.setEnergy(this.fighter.energy)
    return this
  }
}
