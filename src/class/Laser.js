export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setBody(Sprite('laser').setScale(0.2, 0.2))
    this.setSpeed(30)
  },
  update (app) {
    this.superMethod('update', app)
    this.move(false)
    for (const tgt of this.field.enemy.children) {
      if (this.distanceDiff(tgt) < 30) {
        tgt.explosion().remove()
        this.remove()
        break
      }
    }
  }
}
