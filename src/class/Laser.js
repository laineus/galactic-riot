const TYPES = {
  assult: { image: 'laser', speed: 50, isHoming: false, twinDiff: false },
  gatling: { image: 'laser', speed: 50, isHoming: false, twinDiff: 15 },
  twin: { image: 'laser', speed: 50, isHoming: false, twinDiff: 25 },
  sniper: { image: 'laser', speed: 50, isHoming: false, twinDiff: false },
  tailgun: { image: 'laser', speed: 50, isHoming: false, twinDiff: false }
}
export default {
  superClass: 'FlyingElement',
  init (parent, type) {
    this.superInit()
    this.data = TYPES[type]
    this.shooter = parent
    this.type = parent.type
    this.target = parent.target
    if (!this.shooter.shotCount) this.shooter.shotCount = 0
    this.shooter.shotCount++
    this.setSpeed(this.data.speed)
    this.setMobility(5)
    this.setRotation(type === 'tailgun' ? parent.rotation + 180 : parent.rotation)
    if (type === 'tailgun') {
      this.setPosition(
        parent.x + (parent.cos * -60),
        parent.y + (parent.sin * -60)
      )
    } else if (this.data.twinDiff) {
      const add = this.shooter.shotCount % 2 === 0 ? -45 : 45
      this.setPosition(
        parent.x + (Math.cos(Math.degToRad(this.rotation + add)) * this.data.twinDiff),
        parent.y + (Math.sin(Math.degToRad(this.rotation + add)) * this.data.twinDiff)
      )
    } else {
      this.setPosition(
        parent.x + (parent.cos * 60),
        parent.y + (parent.sin * 60)
      )
    }
    const body = SlicedSprite(this.data.image, 1, 3, parent.colorIndex).setScale(0.2, 0.2)
    body.blendMode = 'lighter'
    this.setBody(body)
    this.addChildTo(parent.field.bullet)
  },
  update (app) {
    this.superMethod('update', app)
    this.move(false, true)
    this.hitCheck()
    if (this.data.isHoming) homing()
  },
  hitCheck () {
    for (const tgt of this.targetGroup()) {
      if (this.distanceDiff(tgt) < 30) {
        tgt.damage()
        this.remove()
        break
      }
    }
  },
  homing () {
    if (!this.target) return
    const degDiff = this.degreeDiff(this.target)
    if (Math.abs(degDiff) > 1) {
      this.turn((degDiff > 0 && degDiff < 180) || degDiff < -180 ? 1 : -1)
    }
  }
}
