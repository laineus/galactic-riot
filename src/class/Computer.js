import state from '../config/state'
import Fighter from './Fighter'
export default class Computer extends Fighter {
  constructor () {
    super()
    Object.setPrototypeOf(this, Computer.prototype)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setWeapon(1)
  }
  update (app) {
    super.update(app)
    this.ctrlSpeed()
    this.ctrlTurn()
    this.ctrlBoost()
    this.ctrAction()
    if (!this.target) this.searchTarget()
  }
  get currentTarget () {
    if (this.target) return this.target
    if (this.subTarget) return this.subTarget
    return null
  }
  get acceleValue () {
    if (!this.currentTarget) return 0
    if (this.degreeDiff(this.currentTarget) > 45) return -1
    if (this.distanceDiff(this.currentTarget) > 300) return 1
    return 0
  }
  setType (type) {
    super.setType(type)
    this.setColorIndex(type === 'friend' ? 2 : 3)
    if (type === 'friend') this.setSubTarget(state.player)
    return this
  }
  setSubTarget (target, r = 0, distance = 0) {
    if (!target.isActive()) return
    this.subTarget = target
    this.subTargetRotation = r
    this.subTargetDistance = distance
  }
  searchTarget () {
    const tgt = this.findInVision()
    if (tgt) this.target = tgt
  }
  ctrlSpeed () {
    this.accele(this.turnBoost > 0 ? this.speedDirection : this.acceleValue)
    this.move(true)
  }
  ctrlBoost () {
    if (Math.randint(1, 200) !== 1 || !this.target) return
    if (this.turnDirection !== 0 && this.target.degreeDiff(this) < 15) this.boost()
  }
  ctrlTurn () {
    const degDiff = (() => {
      if (!this.field.inField(this, 200)) {
        return this.degreeDiffTo(this.field.xCenter, this.field.yCenter)
      } else if (this.target) {
        return this.degreeDiff(this.target)
      } else if (this.subTarget) {
        const cos = Math.cos(Math.degToRad(this.subTarget.rotation + this.subTargetRotation)) * this.subTargetDistance
        const sin = Math.sin(Math.degToRad(this.subTarget.rotation + this.subTargetRotation)) * this.subTargetDistance
        return this.degreeDiffTo(this.subTarget.x + cos, this.subTarget.y + sin)
      }
    })()
    if (Math.abs(degDiff) > 1) this.turn((degDiff > 0 && degDiff < 180) || degDiff < -180 ? 1 : -1)
  }
  ctrAction () {
    if (this.target) {
      if (this.inShotRange(this.target)) {
        this.mainAction()
      }
    }
  }
}
