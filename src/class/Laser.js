export default {
  superClass: 'FlyingElement',
  init (parent) {
    this.superInit()
    this.shooter = parent
    this.type = parent.type
    this.setSpeed(50)
    this.setRotation(parent.rotation)
    this.setPosition(
      parent.x + (parent.cos * 60),
      parent.y + (parent.sin * 60)
    )
    this.setBody(SlicedSprite('laser', 1, 3, parent.colorIndex).setScale(0.2, 0.2))
    this.addChildTo(parent.field.bullet)
  },
  update (app) {
    this.superMethod('update', app)
    this.move(false, true)
    for (const tgt of this.targetGroup()) {
      if (this.distanceDiff(tgt) < 30) {
        tgt.damage()
        this.remove()
        break
      }
    }
  }
}
