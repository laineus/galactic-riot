export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setShotDelay(7)
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
    this.setBody(Sprite(type === 'friend' ? 'f1_f' : 'f6_e').setScale(0.2, 0.2))
    this.setImageName(type === 'friend' ? 'f1_f' : 'f6_e')
    this.setColorIndex(type === 'friend' ? 2 : 3)
  },
  searchTarget () {
    const tgt = this.findInVision()
    if (tgt) this.target = tgt
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
        this.shot()
      }
    }
  }
}
