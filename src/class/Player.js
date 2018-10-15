import state from '../config/state'
import Fighter from './Fighter'
import Box from './Box'
import { colors } from '../config/variables'
export default class Player extends Fighter {
  constructor () {
    super()
    Object.setPrototypeOf(this, Player.prototype)
    state.player = this
    this.setType('friend')
    this.setColorIndex(1)
    this.initSight()
    this.setFighter(state.save.fighter)
    this.setMainWeapon(state.save.mainWeapon)
    this.setSubWeapon(state.save.subWeapon)
    this.addChildTo(state.field.friend)
    this.player = true
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
    if (key.getKey('down')) {
      return this.accele(-1)
    }
    this.accele(0)
  }
  ctrlTurn (key) {
    if (key.getKey('left')) return this.turn(-1)
    if (key.getKey('right')) return this.turn(1)
  }
  ctrAction (key) {
    if (key.getKeyDown('C') && this.hp > 50) {
      this.boost()
      this.hp -= 50
      return
    }
    if (key.getKey('Z') && this.hp > 1) {
      this.mainAction()
      this.hp -= 1
      return
    }
    if (this.hp < this.maxHp) this.hp += 1
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
  initSight () {
    this.sight = new Box(1000, 1, colors.blue).setOrigin(0, 0.5).addChildTo(this)
    this.sight.blendMode = 'lighter'
    this.sight.alpha = 0
  }
}
