export default {
  superClass: 'DisplayElement',
  baseSpeed: 0,
  speed: 0,
  init (option) {
    this.superInit(option)
    this.physical.friction = 1
  },
  setBody (sprite) {
    this.body = sprite.addChildTo(this)
    return this
  },
  setSpeed (speed) {
    this.baseSpeed = speed
    return this
  },
  setField (field) {
    this.field = field
    return this
  },
  turn (direction) {
    this.rotation += this.baseSpeed * direction
    if (this.rotation > 360) this.rotation -= 360
    if (this.rotation < 0) this.rotation += 360
  },
  move (accele) {
    this.speed = this.baseSpeed * accele
    const x = Math.cos(Math.degToRad(this.rotation))
    const y = Math.sin(Math.degToRad(this.rotation))
    this.physical.force(x * this.speed, y * this.speed)
    if (this.x < 0) this.x = this.field.width
    if (this.x > this.field.width) this.x = 0
    if (this.y < 0) this.y = this.field.height
    if (this.y > this.field.height) this.y = 0
  }
}
