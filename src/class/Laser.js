export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setBody(Sprite('laser').setScale(0.2, 0.2))
    this.setSpeed(30)
  },
  update (app) {
    this.superMethod('update', app)
    this.move(false, true)
    for (const tgt of this.targetGroup()) {
      if (this.distanceDiff(tgt) < 30) {
        tgt.hp -= Math.randint(20, 40)
        if (tgt.hp <= 0) tgt.dead()
        this.remove()
        break
      }
    }
  }
}
