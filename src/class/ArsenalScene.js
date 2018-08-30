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
    this.header = this.getHeader()
    this.arsenal = new ArsenalSelect(this.select.bind(this), this.cancel.bind(this)).setPosition(295, 95 + 20).addChildTo(this)
  }
  getHeader () {
    const header = new Box(settings.SCREEN_WIDTH, 40).setOrigin(0, 0).setPosition(0, 20).addChildTo(this)
    header.title = new Text('Arsenal', 24).setOrigin(0, 0).setPosition(25, 0).addChildTo(header)
    header.budgetLabel = new Text('Budget :').setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 150, 5).addChildTo(header)
    header.budgetValue = new Text().setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 20, 5).addChildTo(header)
    header.budgetValue.update = () => header.budgetValue.text = `$ ${intToString(state.save.money)}`
    return header
  }
  select (current) {
    switch (current.name) {
      case 'Fighter':
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
