import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  baseSpeed: 0,
  speed: 0,
  baseShotDelay: 0,
  shotDelay: 0,
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.physical.friction = 1
  },
  update () {
    if (this.shotDelay > 0) this.shotDelay--
  },
  setBody (sprite) {
    this.body = sprite.addChildTo(this)
    return this
  },
  setSpeed (speed) {
    this.baseSpeed = speed
    return this
  },
  setShotDelay (delay) {
    this.baseShotDelay = delay
    return this
  },
  turn (direction) {
    this.rotation += this.baseSpeed * direction
    if (this.rotation > 360) this.rotation -= 360
    if (this.rotation < 0) this.rotation += 360
  },
  move (accele, roop) {
    this.speed = this.baseSpeed * accele
    const x = Math.cos(Math.degToRad(this.rotation))
    const y = Math.sin(Math.degToRad(this.rotation))
    this.physical.force(x * this.speed, y * this.speed)
    if (this.x < 0) roop ? this.x = this.field.width : this.remove()
    if (this.x > this.field.width) roop ? this.x = 0 : this.remove()
    if (this.y < 0) roop ? this.y = this.field.height : this.remove()
    if (this.y > this.field.height) roop ? this.y = 0 : this.remove()
  },
  shot (Bullet) {
    if (this.shotDelay > 0) return
    Bullet.setPosition(this.x, this.y).setRotation(this.rotation).addChildTo(this.field)
    this.shotDelay = this.baseShotDelay
  }
}
