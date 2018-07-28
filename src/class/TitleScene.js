import variables from '../config/variables'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    // this.logo = Sprite('logo').addChildTo(this).setScale(0.5, 0.5)
    //                           .setPosition(this.gridX.center(), this.gridY.span(6))
    this.onpointend = () => this.exit('Game')
  }
}
