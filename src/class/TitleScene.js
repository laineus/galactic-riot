import variables from '../config/variables'
import settings from '../config/settings'
import Cursor from '../utils/Cursor'
import labelList from '../utils/labelList'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    // this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
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

    // cursor test
    const list = labelList(['Mission', 'Customize', 'Exit'], settings.SCREEN_WIDTH_C, 460, this, { margin: 23 })
    this.cursor = new Cursor(list, (current, other) => {
      current.fill = variables.color.blue
      for (const row of other) {
        row.fill = variables.color.white
      }
    }, (current) => {
      console.log(current.text)
    }, () => {
      console.log('end')
    })
  },
  update (app) {
    this.cursor.update(app.keyboard)
  }
}
