import { settings, colors } from '../config/variables'
import saveData from '../utils/saveData'
import Cursor from './Cursor'
import labelList from '../utils/labelList'
import BlurLabel from './BlurLabel'
import MissionSelect from './MissionSelect'
import ArsenalSelect from './ArsenalSelect'
export default class TitleScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, TitleScene.prototype)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.logo = Sprite('logo').addChildTo(this).setScale(0.5, 0.5)
                              .setPosition(this.gridX.center(), this.gridY.span(10))
    this.blendMode = 'lighter'
    option.skip ? this.addMenu() : this.addStartLabel()
    saveData.load()
  }
  update (app) {
    if (this.startLabel) {
      if (app.keyboard.getKeyDown('Z')) this.addMenu()
    }
  }
  addStartLabel () {
    this.removeAll()
    this.logo.alpha = 1
    this.startLabel = new BlurLabel({
      text: '- PRESS \'Z\' KEY -',
      fontFamily: 'aldrich',
      fill: colors.white,
      fontSize: 14,
      shadowBlur: 6,
      shadowColor: colors.blue
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(13.5))
  }
  addMenu (index = 0) {
    this.removeAll()
    this.logo.alpha = 1
    this.list = labelList(['Mission', 'Arsenal', 'Exit'], settings.SCREEN_WIDTH_C, 440, this, { margin: 23 })
    this.list.cursor = new Cursor(this.list, (current, other) => {
      current.fill = colors.blue
      current.fontSize = 15
      other.forEach(v => {
        v.fill = colors.white
        v.fontSize = 14
      })
    }, (current) => {
      switch (current.text) {
        case 'Mission': return this.addMissionSelect()
        case 'Arsenal': return this.addArsenalSelect()
        case 'Exit': return this.addStartLabel()
      }
    }, () => {
      this.addStartLabel()
    }, index).addChildTo(this)
  }
  addMissionSelect () {
    this.removeAll()
    this.logo.alpha = 0
    this.missionSelect = new MissionSelect(this, () => this.addMenu()).addChildTo(this)
  }
  addArsenalSelect () {
    this.removeAll()
    this.logo.alpha = 0
    this.arsenalSelect = new ArsenalSelect(this, () => this.addMenu(1)).addChildTo(this)
  }
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
    if (this.arsenalSelect) {
      this.arsenalSelect.remove()
      this.arsenalSelect = null
    }
  }
}
