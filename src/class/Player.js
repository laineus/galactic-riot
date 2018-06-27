import settings from '../config/settings'
export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setType('friend')
    this.setBody(Sprite('f3_f').setScale(0.2, 0.2))
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.setShotDelay(7)
    this.setMobility(3)
    this.setSpeed(8)
  },
  update (app) {
    this.superMethod('update', app)
    this.ctrlSpeed(app.keyboard)
    this.ctrlTurn(app.keyboard)
    this.ctrAction(app.keyboard)
  },
  ctrlSpeed (key) {
    if (key.getKey('up')) return this.move(1.5, true)
    if (key.getKey('down')) return this.move(0.5, true)
    this.move(1, true)
  },
  ctrlTurn (key) {
    if (key.getKey('left')) return this.turn(-1)
    if (key.getKey('right')) return this.turn(1)
  },
  ctrAction (key) {
    if (key.getKey('Z')) this.shot(Laser())
  }
}
