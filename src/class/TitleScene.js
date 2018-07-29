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
    this.label = BlurLabel({
      text: '- CLICK TO START -',
      fontFamily: 'aldrich',
      fill: variables.color.white,
      fontSize: 14,
      shadowBlur: 6,
      shadowColor: variables.color.blue
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(13))
  }
}
