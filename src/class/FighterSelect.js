import { colors, fighters, settings } from '../config/variables'
import Cursor from './Cursor'
import Box from './Box'
import Text from './Text'
import Modal from './Modal'
const SIZE = 100
const MARGIN = 10
export default class FighterSelect extends Box {
  constructor (callback) {
    super(null, null, colors.dark_07)
    Object.setPrototypeOf(this, FighterSelect.prototype)
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.callback = callback
    const width = (fighters.length * SIZE) + (fighters.length - 1 * MARGIN)
    this.group = DisplayElement().addChildTo(this)
    this.group.setPosition(width / -2, SIZE / -2)
    this.group.list = fighters.map((fighter, i) => this.item(fighter).addChildTo(this.group).setPosition(i * (SIZE + MARGIN), 0))
    this.group.cursor = new Cursor(this.group.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, this.select.bind(this), this.exit.bind(this), false).addChildTo(this)
  }
  item (fighter) {
    const item = new Box(SIZE, SIZE, colors.black_05).setOrigin(0, 0)
    item.label = new Text(fighter.name).addChildTo(item).setOrigin(0, 0).setPosition(10, 0)
    return item
  }
  select () {
    new Modal(selected => {
      if (selected.name !== 'Cancel') this.exit()
    }, null)
  }
  exit () {
    this.remove()
    this.callback()
  }
}
