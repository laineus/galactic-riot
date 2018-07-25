import state from '../config/state'
export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setType('friend')
    this.setJet()
    this.setBody(Sprite('f3_f').setScale(0.2, 0.2))
    this.setImageName('f3_f')
    this.setColorIndex(1)
    this.setShotDelay(5)
    this.setMobility(3)
    this.setSpeed(10)
    this.hp = 500
    this.addChildTo(state.field)
    state.field.player = this
    state.field.camera.setTarget(this)
  },
  update (app) {
    this.superMethod('update', app)
    this.ctrlSpeed(app.keyboard)
    this.ctrlTurn(app.keyboard)
    this.ctrAction(app.keyboard)
    this.move(true)
    this.searchTarget()
  },
  ctrlSpeed (key) {
    if (key.getKey('up')) {
      if (this.field.camera.shock < 3) this.field.camera.addShock(1)
      return this.accele(1)
    }
    if (key.getKey('down')) return this.accele(-1)
    this.accele(0)
  },
  ctrlTurn (key) {
    if (key.getKey('left')) return this.turn(-1)
    if (key.getKey('right')) return this.turn(1)
  },
  ctrAction (key) {
    if (key.getKey('Z')) this.shot()
  },
  searchTarget () {
    if (!this.target) {
      const tgt = this.findInVision()
      if (tgt) this.target = tgt
    } else if (!this.inVision(this.target)) {
      this.target = null
    }
  },
  damage (app) {
    this.superMethod('damage', app)
    this.field.camera.addShock(15)
  }
}
