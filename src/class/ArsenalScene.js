import { settings, colors } from '../config/variables'
import state from '../config/state'
import intToString from '../utils/intToString'
import ArsenalSelect from './ArsenalSelect'
import FighterSelect from './FighterSelect'
import Box from './Box'
import Text from './Text'
export default class ArsenalScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, ArsenalScene.prototype)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.arsenal = new ArsenalSelect(this.select.bind(this), this.cancel.bind(this)).setPosition(295, 95 + 20).addChildTo(this)
    this.box = new Box(settings.SCREEN_WIDTH, 40).setOrigin(0, 0).setPosition(0, 20).addChildTo(this)
    this.title = new Text('Arsenal', 24).setOrigin(0, 0).setPosition(25, 20).addChildTo(this)
    this.budgetLabel = new Text('Budget :').setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 150, 25).addChildTo(this)
    this.budgetValue = new Text(`$ ${intToString(state.save.money)}`).setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 20, 25).addChildTo(this)
  }
  select (current) {
    switch (current.name) {
      case 'Main Weapon':
        this.arsenal.stop()
        new FighterSelect(() => this.arsenal.start()).addChildTo(this)
        break
      case 'Exit':
        this.cancel()
        break
    }
  }
  cancel () {
    this.exit('Title', { skip: 1 })
  }
}
