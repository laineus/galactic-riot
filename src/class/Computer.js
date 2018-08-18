import state from '../config/state'
export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setMobility(3)
    this.setSpeed(9)
  },
  update (app) {
    this.superMethod('update', app)
    this.ctrlSpeed()
    this.ctrlTurn()
    this.ctrAction()
    if (!this.target) this.searchTarget()
  },
  setType (type) {
    this.superMethod('setType', type)
    this.setJet()
    this.setBody(Sprite(type === 'friend' ? 'f1_f' : 'f6_e').setScale(0.2, 0.2))
    this.setImageName(type === 'friend' ? 'f1_f' : 'f6_e')
    this.setColorIndex(type === 'friend' ? 2 : 3)
    if (type === 'friend') this.setSubTarget(state.player)
    return this
  },
  setSubTarget (target, r = 0, distance = 0) {
    this.subTarget = target
    this.subTargetRotation = r
    this.subTargetDistance = distance
  },
  searchTarget () {
    const tgt = this.findInVision()
    if (tgt) this.target = tgt
  },
  ctrlSpeed () {
    this.move(true)
  },
  ctrlTurn () {
    const degDiff = (() => {
      if (this.x < 0 || this.x > this.field.width || this.y < 0 || this.y > this.field.height) {
        return this.degreeDiffTo(this.field.width / 2, this.field.height / 2)
      } else if (this.target) {
        return this.degreeDiff(this.target)
      } else if (this.subTarget) {
        const cos = Math.cos(Math.degToRad(this.subTarget.rotation + this.subTargetRotation)) * this.subTargetDistance
        const sin = Math.sin(Math.degToRad(this.subTarget.rotation + this.subTargetRotation)) * this.subTargetDistance
        return this.degreeDiffTo(this.subTarget.x + cos, this.subTarget.y + sin)
      }
    }) ()
    if (Math.abs(degDiff) > 1) this.turn((degDiff > 0 && degDiff < 180) || degDiff < -180 ? 1 : -1)
  },
  ctrAction () {
    if (this.target) {
      if (this.inShotRange(this.target)) {
        this.shot()
      }
    }
  }
}
