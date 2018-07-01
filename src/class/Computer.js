export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setShotDelay(7)
    this.setMobility(3)
    this.setSpeed(6)
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
    this.setBody(Sprite(type === 'friend' ? 'f1_f' : 'f6_e').setScale(0.2, 0.2))
  },
  searchTarget () {
    for (const enemy of this.targetGroup()) {
      if (this.inVision(enemy)) {
        this.target = enemy
        break
      }
    }
  },
  ctrlSpeed () {
    this.move(true)
  },
  ctrlTurn () {
    if (this.target) {
      const degDiff = this.degreeDiff(this.target)
      if (Math.abs(degDiff) > 1) {
        this.turn((degDiff > 0 && degDiff < 180) || degDiff < -180 ? 1 : -1)
      }
    }
  },
  ctrAction () {
    if (this.target) {
      if (this.inShotRange(this.target)) {
        this.shot(Laser())
      }
    }
  }
}
