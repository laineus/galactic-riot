export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setBody(Sprite('player').setScale(0.2, 0.2))
    this.setPosition(Math.randint(0, this.field.width), Math.randint(0, this.field.height))
    this.setRotation(Math.randint(0, 360))
    this.setShotDelay(7)
    this.setSpeed(6)
  },
  update (app) {
    this.superMethod('update', app)
    this.ctrlSpeed()
    this.ctrlTurn()
    this.ctrAction()
  },
  ctrlSpeed () {
    this.move(1, true)
  },
  ctrlTurn () {
  },
  ctrAction () {
  }
}
