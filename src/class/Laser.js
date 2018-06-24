export default {
  superClass: 'FlyingElement',
  init (option) {
    this.superInit(option)
    this.setBody(Sprite('laser').setScale(0.2, 0.2))
    this.setSpeed(30)
  },
  update () {
    this.move(1, false)
  }
}
