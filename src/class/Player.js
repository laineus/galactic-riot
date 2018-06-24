import settings from '../config/settings'
export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setBody(Sprite('player').setScale(0.2, 0.2))
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.setSpeed(6)
  },
  update (app) {
    this.ctrlSpeed(app.keyboard)
    this.ctrlTurn(app.keyboard)
  },
  ctrlSpeed (key) {
    if (key.getKey('up')) return this.move(1.5)
    if (key.getKey('down')) return this.move(0.5)
    this.move(1)
  },
  ctrlTurn (key) {
    if (key.getKey('left')) return this.turn(-1)
    if (key.getKey('right')) return this.turn(1)
  }
}
