import Player from './Player'
import state from '../config/state'
export default class OnlinePlayer extends Player {
  constructor (connection) {
    super()
    Object.setPrototypeOf(this, OnlinePlayer.prototype)
    this.connection = connection
    this.setAttachment(null)
    this.setWeapon(1)
  }
  update (app) {
    super.update(app)
    this.connection.commit('playerData', this.playerData)
  }
  damage (damage, shooter) {
    if (!this.isActive) return
    this.explosion(1)
    this.hp -= damage * (this.attachmentId === 2 ? 0.7 : 1)
    if (!this.isActive) this.dead(shooter)
  }
  dead (shooter) {
    this.connection.commit('dead', shooter)
    state.score.death++
    super.dead()
  }
  mainAction () {
    const lasers = super.mainAction()
    if (lasers) this.connection.commit('laser', null)
  }
  get playerData () {
    return { fighter: this.fighter.id, x: this.x, y: this.y, r: this.rotation, hp: this.hp }
  }
}
