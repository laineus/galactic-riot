import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  baseMobility: 0,
  baseSpeed: 0,
  speed: 0,
  baseShotDelay: 0,
  shotDelay: 0,
  cos: 0,
  sin: 0,
  acceleration: 1.0,
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.physical.friction = 0.96
    this.physical.velocity.set(0, 0)
    this.hp = 100
  },
  update () {
    if (this.shotDelay > 0) this.shotDelay--
    this.cos = Math.cos(Math.degToRad(this.rotation))
    this.sin = Math.sin(Math.degToRad(this.rotation))
  },
  setType (type) {
    this.type = type
    this.addChildTo(state.field[type])
  },
  targetGroup () {
    return this.field[this.type === 'friend' ? 'enemy' : 'friend'].children
  },
  setJet () {
    this.jet = Sprite('jet').setScale(0.2, 0.2).addChildTo(this)
    this.jet.blendMode = 'lighter'
    return this
  },
  setBody (sprite) {
    this.body = sprite.addChildTo(this)
    return this
  },
  setImageName (name) {
    this.imageName = name
    return this
  },
  setColorIndex (i) {
    this.colorIndex = i
    return this
  },
  setMobility (mobility) {
    this.baseMobility = mobility
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
  accele (direction) {
    const add = 0.05
    if (direction === 0) {
      if (this.acceleration > 1.0) this.acceleration -= add
      if (this.acceleration < 1.0) this.acceleration += add
    } else if (direction === -1 && this.acceleration > 0.5) {
      this.acceleration -= add
    } else if (direction === 1 && this.acceleration < 1.5) {
      this.acceleration += add
    }
    if (this.jet) {
      this.jet.scale.x = (this.acceleration + 1) * 0.1
      this.jet.scale.y = (this.acceleration + 1) * 0.1
    }
  },
  turn (direction) {
    const accele = 1.5 - this.acceleration * 0.5
    this.rotation += this.baseMobility * accele * direction
    if (this.rotation > 360) this.rotation -= 360
    if (this.rotation < 0) this.rotation += 360
  },
  move (roop, force = false) {
    this.speed = this.baseSpeed * this.acceleration
    if (force) {
      this.physical.force(this.cos * this.speed, this.sin * this.speed)
    } else {
      this.physical.velocity.x += this.cos
      this.physical.velocity.y += this.sin
      if (Math.abs(this.physical.velocity.x) > this.speed) this.physical.velocity.x = this.physical.velocity.x > 0 ? this.speed : -this.speed
      if (Math.abs(this.physical.velocity.y) > this.speed) this.physical.velocity.y = this.physical.velocity.y > 0 ? this.speed : -this.speed
    }
    if (this.x < 0) roop ? this.x = this.field.width : this.remove()
    if (this.x > this.field.width) roop ? this.x = 0 : this.remove()
    if (this.y < 0) roop ? this.y = this.field.height : this.remove()
    if (this.y > this.field.height) roop ? this.y = 0 : this.remove()
  },
  shot () {
    if (this.shotDelay > 0) return
    Laser(this, 'assult')
    this.shotDelay = this.baseShotDelay
  },
  degreeTo (target) {
    const deg = Math.radToDeg(Math.atan2(target.y - this.y, target.x - this.x))
    return deg >= 0 ? deg : deg + 360
  },
  degreeDiff (target) {
    return this.degreeTo(target) - this.rotation
  },
  distanceDiff (target) {
    return Math.hypot(target.x - this.x, target.y - this.y)
  },
  inVision (target) {
    return Math.abs(this.degreeDiff(target)) < 45 && this.distanceDiff(target) < 560
  },
  inShotRange (target) {
    return Math.abs(this.degreeDiff(target)) < 15 && this.distanceDiff(target) < 400
  },
  findInVision () {
    return this.targetGroup().find(v => this.inVision(v))
  },
  findInShotRange () {
    return this.targetGroup().find(v => this.inShotRange(v))
  },
  explosion (level, shock = false) {
    Explosion({ x: this.x, y: this.y, piece: this.imageName, level: level, shock: shock })
    return this
  },
  damage () {
    this.explosion(1)
    this.hp -= Math.randint(20, 40)
    if (this.hp <= 0) this.dead()
  },
  dead () {
    this.explosion(5, 25)
    for (const tgt of this.targetGroup()) {
      if (tgt.target === this) tgt.target = null
    }
    this.remove()
    return this
  }
}
