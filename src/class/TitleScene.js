import { settings, colors, sounds } from '../config/variables'
import saveData from '../utils/saveData'
import Cursor from './Cursor'
import labelList from '../utils/labelList'
import BlurLabel from './BlurLabel'
import MissionSelect from './MissionSelect'
import Text from './Text'
import Box from './Box'
import bgm from '../utils/bgm'
export default class TitleScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, TitleScene.prototype)
    bgm.set('title')
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.logo = Sprite('logo').addChildTo(this).setScale(0.5, 0.5)
                              .setPosition(this.gridX.center(), this.gridY.span(10))
    this.sub = new Text('[X] Enter [X] Cancel [↑][↓] Select', 10, { fill: colors.gray }).setOrigin(1, 1).setPosition(settings.SCREEN_WIDTH - 10, settings.SCREEN_HEIGHT - 5).addChildTo(this)
    this.credit = new Box(settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT, colors.black).addChildTo(this).setOrigin(0, 0)
    this.credit.logo = Sprite('credit').addChildTo(this.credit).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C).setScale(0.4, 0.4)
    option.skip ? this.addMenu(option.skip) : this.addCredit()
    saveData.load()
  }
  update (app) {
    if (this.startLabel) {
      if (app.keyboard.getKeyDown('Z')) this.addMenu()
    }
  }
  addCredit () {
    // return this.addStartLabel() // debug
    this.removeAll()
    this.credit.alpha = 1
    this.credit.logo.alpha = 0
    this.credit.logo.tweener.wait(100).to({ alpha: 1 }, 300).wait(800).to({ alpha: 0 }, 300).play()
    this.credit.tweener.wait(1500).to({ alpha: 0 }, 300)
    setTimeout(this.addStartLabel.bind(this), 1800)
    this.logo.alpha = 0
    this.logo.y += 10
    this.logo.tweener.wait(1300).by({ y: -10, alpha: 1 }, 800).play()
  }
  addStartLabel () {
    this.removeAll()
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
    this.sub.alpha = 1
    this.logo.alpha = 1
    this.list = labelList(['Mission', 'Arsenal', 'Exit'], settings.SCREEN_WIDTH_C, 440, this, { margin: 23 })
    this.list.forEach(v => v.originalText = v.text)
    this.list.cursor = new Cursor(this.list, (current, other) => {
      current.text = `- ${current.originalText} -`
      current.fontSize = 15
      other.forEach(v => {
        v.text = v.originalText
        v.fontSize = 14
      })
    }, (current) => {
      switch (current.originalText) {
        case 'Mission': return this.addMissionSelect()
        case 'Arsenal': return this.exit('Arsenal')
        case 'Exit': return this.addStartLabel()
      }
    }, () => {
      this.addStartLabel()
    }, true, index).addChildTo(this)
  }
  addMissionSelect () {
    this.removeAll()
    this.logo.alpha = 0
    this.missionSelect = new MissionSelect(this, () => this.addMenu()).addChildTo(this)
  }
  removeAll () {
    this.credit.alpha = 0
    this.sub.alpha = 0
    if (this.startLabel) {
      this.startLabel.remove()
      this.startLabel = null
    }
    if (Array.isArray(this.list)) {
      this.list.cursor.remove()
      this.list.forEach(v => v.remove())
      this.list = null
    }
    if (this.missionSelect) {
      this.missionSelect.remove()
      this.missionSelect = null
    }
  }
}
