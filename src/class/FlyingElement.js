import state from '../config/state'
import Explosion from './Explosion'
export default class FlyingElement extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, FlyingElement.prototype)
    this.field = state.field
    this.physical.friction = 0.95
    this.physical.velocity.set(0, 0)
    this.hp = 100
    this.baseMobility = 0
    this.baseSpeed = 0
    this.speed = 0
    this.mainWeapon = null
    this.mainWeaponDelay = 0
    this.subWeapon = null
    this.subWeaponDelay = 0
    this.cos = 0
    this.sin = 0
    this.acceleration = 1.0
    this.turnDirection = 0
    this.turnBoost = 0
    this.oldXs = []
    this.oldYs = []
  }
  update () {
    this.oldXs.unshift(this.x)
    this.oldYs.unshift(this.y)
    this.oldXs.splice(10)
    this.oldYs.splice(10)
    this.turnDirection = 0
    if (this.mainWeaponDelay > 0) this.mainWeaponDelay--
    if (this.subWeaponDelay > 0) this.subWeaponDelay--
    this.cos = Math.cos(Math.degToRad(this.rotation))
    this.sin = Math.sin(Math.degToRad(this.rotation))
    if (this.target && !this.target.isActive()) this.target = null
    if (this.subTarget && !this.subTarget.isActive()) this.subTarget = null
  }
  setType (type) {
    this.type = type
    this.addChildTo(state.field[type])
    return this
  }
  bullets () {
    return this.field.bullet.children
  }
  sameGroup () {
    return this.field[this.type].children
  }
  sameHash () {
    return this.field[this.type].children.filter(v => this.hash === v.hash)
  }
  targetGroup () {
    return this.field[this.type === 'friend' ? 'enemy' : 'friend'].children
  }
  setJet () {
    this.jet = Sprite('jet').setScale(0.2, 0.2).addChildTo(this)
    this.jet.blendMode = 'lighter'
    return this
  }
  setBody (sprite) {
    this.body = sprite.addChildTo(this)
    return this
  }
  setImageName (name) {
    this.imageName = name
    return this
  }
  setColorIndex (i) {
    this.colorIndex = i
    this.color = (() => {
      switch (i) {
        case 1: return 'blue'
        case 2: return 'green'
        case 3: return 'pink'
      }
    })()
    return this
  }
  setMobility (mobility) {
    this.baseMobility = mobility
    return this
  }
  setSpeed (speed) {
    this.baseSpeed = speed
    return this
  }
  accele (direction) {
    this.speedDirection = direction
    const add = 0.2
    if (direction === 0) {
      if (this.acceleration > 1.0) this.acceleration -= add
      if (this.acceleration < 1.0) this.acceleration += add
    } else if (direction === -1 && this.acceleration > 0.25) {
      this.acceleration -= add
    } else if (direction === 1 && this.acceleration < 1.75) {
      this.acceleration += add
    }
    if (this.jet) {
      this.jet.scale.x = (this.acceleration + 1) * 0.1
      this.jet.scale.y = (this.acceleration + 1) * 0.1
    }
  }
  turn (direction, max = 100) {
    this.turnDirection = direction
    const accele = (() => {
      const base = 1
      // const base = 1.5 - this.acceleration * 0.5
      if (this.turnBoost == 0) {
        return base
      }
      return base + Math.min((this.turnBoost) / 3, 2)
    })()
    this.rotation += Math.min(this.baseMobility, max) * accele * this.turnDirection
    if (this.rotation > 360) this.rotation -= 360
    if (this.rotation < 0) this.rotation += 360
  }
  move (roop, force = false) {
    this.speed = this.baseSpeed * this.acceleration
    if (this.turnBoost > 0) {
      const r = (this.speedDirection === -1) ? this.rotation + 180 : this.rotation - (60 * this.turnDirection)
      const speed = Math.max((this.turnBoost) / 3, 1.5)
      this.physical.velocity.x = Math.cos(Math.degToRad(r)) * this.baseSpeed * speed
      this.physical.velocity.y = Math.sin(Math.degToRad(r)) * this.baseSpeed * speed
      this.turnBoost--
    } else if (force) {
      this.physical.force(this.cos * this.speed, this.sin * this.speed)
    } else if (Math.hypot(this.physical.velocity.x, this.physical.velocity.y) < this.speed) {
      this.physical.velocity.x += this.cos
      this.physical.velocity.y += this.sin
    }
    if (roop) return
    if (this.x < 0 || this.x > this.field.width || this.y < 0 || this.y > this.field.height) this.remove()
    // if (this.x < 0) roop ? this.x += this.field.width : this.remove()
    // if (this.x > this.field.width) roop ? this.x -= this.field.width : this.remove()
    // if (this.y < 0) roop ? this.y += this.field.height : this.remove()
    // if (this.y > this.field.height) roop ? this.y -= this.field.height : this.remove()
  }
  boost () {
    if (this.turnBoost > 0) return
    this.turnBoost = 20
  }
  degreeTo (x, y) {
    const deg = Math.radToDeg(Math.atan2(y - this.y, x - this.x))
    return deg >= 0 ? deg : deg + 360
  }
  degreeDiffTo (x, y) {
    return this.degreeTo(x, y) - this.rotation
  }
  degreeDiff (target) {
    return this.degreeDiffTo(target.x, target.y)
  }
  distanceDiff (target) {
    return Math.hypot(target.x - this.x, target.y - this.y)
  }
  inVision (target) {
    return Math.abs(this.degreeDiff(target)) < 45 && this.distanceDiff(target) < 560
  }
  inShotRange (target) {
    return Math.abs(this.degreeDiff(target)) < 15 && this.distanceDiff(target) < 400
  }
  findInVision () {
    return this.targetGroup().find(v => this.inVision(v))
  }
  findInShotRange () {
    return this.targetGroup().find(v => this.inShotRange(v))
  }
  explosion (level, shock = false) {
    new Explosion({ x: this.x, y: this.y, piece: this.imageName, level: level, shock: shock })
    return this
  }
}
