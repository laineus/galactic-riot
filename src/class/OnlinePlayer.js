import Player from './Player'
export default class OnlinePlayer extends Player {
  constructor (connection) {
    super()
    Object.setPrototypeOf(this, OnlinePlayer.prototype)
    this.connection = connection
  }
  update (app) {
    super.update(app)
    this.connection.commit('playerData', this.playerData)
  }
  dead () {
    this.connection.commit('playerData', this.playerData)
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
