import { mainWeapons, subWeapons } from '../config/variables'
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
  setMainWeapon (name) {
    this.mainWeapon = mainWeapons.find(v => v.name === name)
  }
  setSubWeapon (name) {
    this.subWeapon = subWeapons.find(v => v.name === name)
  }
  mainAction () {
    if (this.mainWeaponDelay > 0 || !this.mainWeapon) return
    new Laser(this, this.mainWeapon)
    if (this.mainWeapon.name === 'twin') new Laser(this, this.mainWeapon)
    this.mainWeaponDelay = this.mainWeapon.delay
  }
  subAction () {
    if (this.subWeaponDelay > 0 || !this.subWeapon) return
    switch (this.subWeapon.name) {
      case 'boost':
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
    this.sameHash().forEach(obj => obj.target = shooter)
    if (!this.isActive()) this.dead()
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
