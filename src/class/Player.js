import settings from '../config/settings'
const SPEED = 6
export default {
  superClass: 'DisplayElement',
  targetRadian: 0,
  init (option) {
    this.superInit(option)
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.physical.friction = 1
    this.body = Sprite('player').addChildTo(this).setScale(0.2, 0.2)
  },
  setField (field) {
    this.field = field
    this.field.onpointend = e => {
      const diffX = e.pointer.x - this.x
      const diffY = e.pointer.y - this.y
      this.targetRadian = Math.atan2(diffY, diffX)
    }
  },
  update (app) {
    const r = (Math.radToDeg(this.targetRadian) - this.rotation) > 0 ? 1 : -1
    this.rotation += r * SPEED
    const x = Math.cos(Math.degToRad(this.rotation))
    const y = Math.sin(Math.degToRad(this.rotation))
    this.physical.force(x * SPEED, y * SPEED)
  }
}
