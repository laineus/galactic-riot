import settings from '../config/settings'
const SPEED = 6
export default {
  superClass: 'DisplayElement',
  targetDeg: null,
  speed: 0,
  init (option) {
    this.superInit(option)
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.physical.friction = 1
    this.body = Sprite('player').addChildTo(this).setScale(0.2, 0.2)
  },
  setField (field) {
    this.field = field
    return this
  },
  setScreen (screen) {
    this.screen = screen
    return this
  },
  update (app) {
    this.ctrlSpeed(app.keyboard)
    this.ctrlTurn(app.keyboard)
    this.move()
  },
  ctrlSpeed (key) {
    if (key.getKey('up')) return this.speed = SPEED * 1.5
    if (key.getKey('down')) return this.speed = SPEED * 0.5
    this.speed = SPEED
  },
  ctrlTurn (key) {
    if (key.getKey('left')) this.rotation -= SPEED
    if (key.getKey('right')) this.rotation += SPEED
    if (this.rotation > 360) this.rotation -= 360
    if (this.rotation < 0) this.rotation += 360
  },
  move () {
    const x = Math.cos(Math.degToRad(this.rotation))
    const y = Math.sin(Math.degToRad(this.rotation))
    this.physical.force(x * this.speed, y * this.speed)
  }
}
