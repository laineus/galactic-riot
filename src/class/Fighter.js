import { fighterFind, mainWeaponFind, subWeaponFind } from '../config/variables'
import state from '../config/state'
import Laser from './Laser'
import FlyingElement from './FlyingElement'
export default class Fighter extends FlyingElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, Fighter.prototype)
    this.hp = 100
    this.mainWeapon = null
    this.mainWeaponDelay = 0
    this.subWeapon = null
    this.subWeaponDelay = 0
  }
  isActive () {
    return this.hp > 0
  }
  setFighter (id) {
    this.fighter = fighterFind(id)
    this.setMobility(this.fighter.mobility)
    this.setSpeed(this.fighter.speed)
    const key = this.type === 'friend' ? 'img' : 'img2'
    this.setBody(Sprite(this.fighter[key]).setScale(0.2, 0.2))
    this.setImageName(this.fighter[key])
  }
  setMainWeapon (id) {
    this.mainWeapon = mainWeaponFind(id)
  }
  setSubWeapon (id) {
    this.subWeapon = subWeaponFind(id)
  }
  mainAction () {
    if (this.mainWeaponDelay > 0 || !this.mainWeapon) return
    new Laser(this, this.mainWeapon)
    if (this.mainWeapon.name === 'Twin') new Laser(this, this.mainWeapon)
    this.mainWeaponDelay = this.mainWeapon.delay
  }
  subAction () {
    if (this.subWeaponDelay > 0 || !this.subWeapon) return
    switch (this.subWeapon.name) {
      case 'Booster':
        this.boost()
        break
      default:
        new Laser(this, this.subWeapon)
        break
    }
    this.subWeaponDelay = this.subWeapon.delay
  }
  damage (damage, shooter) {
    this.explosion(1)
    this.hp -= damage
    // target
    if (shooter === state.player && this.target !== shooter && this.target) state.score.rescue++
    this.target = shooter
    this.sameHash().forEach(obj => {
      if (!obj.target) obj.target = shooter
    })
    // death
    if (!this.isActive()) {
      if (this.type === 'friend') state.score.death++
      if (shooter === state.player) state.score.kill++
      this.dead()
    }
  }
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
