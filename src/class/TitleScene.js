import { settings, colors } from '../config/variables'
import Cursor from '../utils/Cursor'
import labelList from '../utils/labelList'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.logo = Sprite('logo').addChildTo(this).setScale(0.5, 0.5)
                              .setPosition(this.gridX.center(), this.gridY.span(10))
    this.blendMode = 'lighter'
    this.addStartLabel()
  },
  update (app) {
    if (this.startLabel) {
      if (app.keyboard.getKeyDown('Z')) this.addMenu()
    } else if (this.list) {
      this.list.cursor.update(app.keyboard)
    }
  },
  addStartLabel () {
    this.removeAll()
    this.logo.alpha = 1
    this.startLabel = BlurLabel({
      text: '- PRESS \'Z\' KEY -',
      fontFamily: 'aldrich',
      fill: colors.white,
      fontSize: 14,
      shadowBlur: 6,
      shadowColor: colors.blue
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(13.5))
  },
  addMenu () {
    this.removeAll()
    this.logo.alpha = 1
    this.list = labelList(['Mission', 'Customize', 'Exit'], settings.SCREEN_WIDTH_C, 440, this, { margin: 23 })
    this.list.cursor = new Cursor(this.list, (current, other) => {
      current.fill = colors.blue
      other.forEach(v => v.fill = colors.white)
    }, (current) => {
      switch (current.text) {
        case 'Mission': return this.addMissionSelect()
        case 'Exit': return this.addStartLabel()
      }
    }, () => {
      this.addStartLabel()
    })
  },
  addMissionSelect () {
    this.removeAll()
    this.logo.alpha = 0
    this.missionSelect = MissionSelect(this, () => this.addMenu()).addChildTo(this)
  },
  removeAll () {
    if (this.startLabel) {
      this.startLabel.remove()
      this.startLabel = null
    }
    if (Array.isArray(this.list)) {
      this.list.forEach(v => v.remove())
      this.list = null
    }
    if (this.missionSelect) {
      this.missionSelect.remove()
      this.missionSelect = null
    }
  }
}
