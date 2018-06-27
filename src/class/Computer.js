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
  },
  setType (type) {
    this.superMethod('setType', type)
    this.setBody(Sprite(type === 'friend' ? 'f1_f' : 'f6_e').setScale(0.2, 0.2))
  },
  ctrlSpeed () {
    this.move(true)
  },
  ctrlTurn () {
  },
  ctrAction () {
  }
}
