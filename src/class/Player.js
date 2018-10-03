import state from '../config/state'
import Fighter from './Fighter'
export default class Player extends Fighter {
  constructor () {
    super()
    Object.setPrototypeOf(this, Player.prototype)
    state.player = this
    this.setType('friend')
    this.setJet()
    this.setColorIndex(1)
    this.hp = 500
    this.setFighter(state.save.fighter)
    this.setMainWeapon(state.save.mainWeapon)
    this.setSubWeapon(state.save.subWeapon)
    this.addChildTo(state.field.friend)
  }
  update (app) {
    super.update(app)
    this.ctrlSpeed(app.keyboard)
    this.ctrlTurn(app.keyboard)
    this.ctrAction(app.keyboard)
    this.move(true)
    this.searchTarget()
  }
  ctrlSpeed (key) {
    if (key.getKey('up')) {
      if (this.field.camera.shock < 3) this.field.camera.addShock(1)
      return this.accele(1)
    }
    if (key.getKey('down')) return this.accele(-1)
    this.accele(0)
  }
  ctrlTurn (key) {
    if (key.getKey('left')) return this.turn(-1)
    if (key.getKey('right')) return this.turn(1)
  }
  ctrAction (key) {
    if (key.getKey('Z')) this.mainAction()
    if (key.getKey('X')) this.subAction()
    if (key.getKey('C')) this.boost()
  }
  searchTarget () {
    if (!this.target) {
      const tgt = this.findInVision()
      if (tgt) this.target = tgt
    } else if (!this.inVision(this.target)) {
      this.target = null
    }
  }
  damage (damage, shooter) {
    super.damage(damage, shooter)
    this.field.camera.addShock(15)
  }
}
