import settings from '../config/settings'
const SPEED = 6
export default {
  superClass: 'DisplayElement',
  targetDeg: 0,
  screenX: 0,
  screenY: 0,
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
    this.screen.onpointend = e => {
      const diffX = e.pointer.x - this.screenX
      const diffY = e.pointer.y - this.screenY
      const deg = Math.radToDeg(Math.atan2(diffY, diffX))
      this.targetDeg = deg >= 0 ? deg : deg + 360
    }
    return this
  },
  update (app) {
    if (this.field) {
      this.screenX = this.x + this.field.x
      this.screenY = this.y + this.field.y
    }
    this.tern()
    this.move()
  },
  tern () {
    const diff = this.targetDeg - this.rotation
    const direction = (diff > 0 && diff < 180) || diff < -180 ? 1 : -1
    const power = Math.abs(diff) < SPEED ? Math.abs(diff) : SPEED
    this.rotation += direction * power
    if (this.rotation > 360) this.rotation -= 360
    if (this.rotation < 0) this.rotation += 360
  },
  move () {
    const x = Math.cos(Math.degToRad(this.rotation))
    const y = Math.sin(Math.degToRad(this.rotation))
    this.physical.force(x * SPEED, y * SPEED)
  }
}
