import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  baseSpeed: 0,
  speed: 0,
  baseShotDelay: 0,
  shotDelay: 0,
  cos: 0,
  sin: 0,
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.physical.friction = 1
  },
  update () {
    if (this.shotDelay > 0) this.shotDelay--
    this.cos = Math.cos(Math.degToRad(this.rotation))
    this.sin = Math.sin(Math.degToRad(this.rotation))
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
    this.physical.force(this.cos * this.speed, this.sin * this.speed)
    if (this.x < 0) roop ? this.x = this.field.width : this.remove()
    if (this.x > this.field.width) roop ? this.x = 0 : this.remove()
    if (this.y < 0) roop ? this.y = this.field.height : this.remove()
    if (this.y > this.field.height) roop ? this.y = 0 : this.remove()
  },
  shot (Bullet) {
    if (this.shotDelay > 0) return
    const bullet = Bullet.addChildTo(this.field.bullet).setRotation(this.rotation).setPosition(
      this.x + (this.cos * 60),
      this.y + (this.sin * 60)
    )
    bullet.shooter = this
    this.shotDelay = this.baseShotDelay
  }
}
