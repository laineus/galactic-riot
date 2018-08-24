import state from '../config/state'
import FlyingElement from './FlyingElement'
export default class Player extends FlyingElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, Player.prototype)
    state.player = this
    this.setType('friend')
    this.setJet()
    this.setBody(Sprite(state.save.fighter).setScale(0.2, 0.2))
    this.setImageName(state.save.fighter)
    this.setColorIndex(1)
    this.setMobility(3)
    this.setSpeed(10)
    this.hp = 500
    this.addChildTo(state.field.friend)
    this.setMainWeapon(state.save.mainWeapon)
    this.setSubWeapon(state.save.subWeapon)
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
