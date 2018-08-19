import { mainWeapons, subWeapons } from '../config/variables'
import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  baseMobility: 0,
  baseSpeed: 0,
  speed: 0,
  mainWeapon: null,
  mainWeaponDelay: 0,
  subWeapon: null,
  subWeaponDelay: 0,
  cos: 0,
  sin: 0,
  acceleration: 1.0,
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.physical.friction = 0.97
    this.physical.velocity.set(0, 0)
    this.hp = 100
  },
  update () {
    if (this.mainWeaponDelay > 0) this.mainWeaponDelay--
    if (this.subWeaponDelay > 0) this.subWeaponDelay--
    this.cos = Math.cos(Math.degToRad(this.rotation))
    this.sin = Math.sin(Math.degToRad(this.rotation))
    if (this.target && !this.target.isActive()) this.target = null
    if (this.subTarget && !this.subTarget.isActive()) this.subTarget = null
  },
  isActive () {
    return this.hp > 0
  },
  setMainWeapon (name) {
    this.mainWeapon = mainWeapons.find(v => v.name === name)
  },
  setSubWeapon (name) {
    this.subWeapon = subWeapons.find(v => v.name === name)
  },
  setType (type) {
    this.type = type
    this.addChildTo(state.field[type])
    return this
  },
  bullets () {
    return this.field.bullet.children
  },
  sameGroup () {
    return this.field[this.type].children
  },
  sameHash () {
    return this.field[this.type].children.filter(v => this.hash === v.hash)
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
  },
  mainAction () {
    if (this.mainWeaponDelay > 0 || !this.mainWeapon) return
    Laser(this, this.mainWeapon)
    if (this.mainWeapon.name === 'twin') Laser(this, this.mainWeapon)
    this.mainWeaponDelay = this.mainWeapon.delay
  },
  subAction () {
    if (this.subWeaponDelay > 0 || !this.subWeapon) return
    switch (this.subWeapon.name) {
      case 'boost':
        this.boost()
        break
      default:
        Laser(this, this.subWeapon)
        break
    }
    this.subWeaponDelay = this.subWeapon.delay
  },
  boost (power = 30) {
    this.physical.velocity.x += this.cos * power
    this.physical.velocity.y += this.sin * power
  },
  degreeTo (x, y) {
    const deg = Math.radToDeg(Math.atan2(y - this.y, x - this.x))
    return deg >= 0 ? deg : deg + 360
  },
  degreeDiffTo (x, y) {
    return this.degreeTo(x, y) - this.rotation
  },
  degreeDiff (target) {
    return this.degreeDiffTo(target.x, target.y)
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
  damage (damage, shooter) {
    this.explosion(1)
    this.hp -= damage
    this.sameHash().forEach(obj => obj.target = shooter)
    if (!this.isActive()) this.dead()
  },
  dead () {
    this.explosion(5, 25)
    this.targetGroup().forEach(tgt => {
      if (tgt.target === this) tgt.target = null
    })
    this.sameGroup().forEach(tgt => {
      if (tgt.subTarget === this) tgt.subTarget = null
    })
    this.bullets().forEach(tgt => {
      if (tgt.target === this) tgt.target = null
    })
    this.remove()
    return this
  }
}
