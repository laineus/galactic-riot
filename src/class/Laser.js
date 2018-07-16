const TYPES = {
  laser: { image: 'laser', speed: 50, isHoming: false }
}
export default {
  superClass: 'FlyingElement',
  init (parent, type) {
    this.superInit()
    this.data = TYPES[type]
    this.shooter = parent
    this.type = parent.type
    this.target = parent.target
    this.setSpeed(this.data.speed)
    this.setMobility(5)
    this.setRotation(parent.rotation)
    this.setPosition(
      parent.x + (parent.cos * 60),
      parent.y + (parent.sin * 60)
    )
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
