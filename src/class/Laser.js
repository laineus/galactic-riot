export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setBody(Sprite('laser').setScale(0.2, 0.2))
    this.setSpeed(40)
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
