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
    this.logo = Sprite('logo').addChildTo(this).setScale(0.5, 0.5)
                              .setPosition(this.gridX.center(), this.gridY.span(10))
    this.addStartLabel()
  },
  update (app) {
    if (this.startLabel) {
      if (app.keyboard.getKeyDown('Z')) {
        this.goToMenu()
      }
    } else if (this.list) {
      this.cursor.update(app.keyboard)
    }
  },
  addStartLabel () {
    this.startLabel = BlurLabel({
      text: '- PRESS \'Z\' KEY -',
      fontFamily: 'aldrich',
      fill: variables.color.white,
      fontSize: 14,
      shadowBlur: 6,
      shadowColor: variables.color.blue
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(13.5))
  },
  addMenu () {
    this.list = labelList(['Mission', 'Customize', 'Exit'], settings.SCREEN_WIDTH_C, 440, this, { margin: 23 })
    this.cursor = new Cursor(this.list, (current, other) => {
      current.fill = variables.color.blue
      for (const row of other) {
        row.fill = variables.color.white
      }
    }, (current) => {
      switch (current.text) {
        case 'Mission': return this.exit('Game')
        case 'Exit': return this.backToTitle()
      }
    }, () => {
      this.backToTitle()
    })
  },
  goToMenu () {
    this.startLabel.remove()
    this.startLabel = null
    this.addMenu()
  },
  backToTitle () {
    this.list.forEach(v => v.remove())
    this.list = null
    this.addStartLabel()
  }
}
