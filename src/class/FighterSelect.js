import { colors, fighters, fighterFind, settings } from '../config/variables'
import state from '../config/state';
import intToString from '../utils/intToString'
import saveData from '../utils/saveData'
import Cursor from './Cursor'
import Box from './Box'
import Text from './Text'
import Modal from './Modal'
const SIZE = 120
const MARGIN = 15
export default class FighterSelect extends Box {
  constructor (callback) {
    super(null, null, colors.dark_05)
    Object.setPrototypeOf(this, FighterSelect.prototype)
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.callback = callback
    const defaultIndex = fighters.findIndex(v => v.id === state.save.fighter)
    const width = (fighters.length * SIZE) + ((fighters.length - 1) * MARGIN)
    this.group = DisplayElement().addChildTo(this)
    this.group.setPosition(width / -2, SIZE / -2)
    this.group.list = fighters.map((fighter, i) => this.item(fighter).addChildTo(this.group).setPosition(i * (SIZE + MARGIN), 0))
    this.group.cursor = new Cursor(this.group.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, this.select.bind(this), this.exit.bind(this), false, defaultIndex).addChildTo(this)
  }
  item (fighter) {
    const item = new Box(SIZE, SIZE, colors.black_05).setOrigin(0, 0)
    item.fighter = fighter
    item.img = Sprite(fighter.img).addChildTo(item).setPosition(SIZE / 2, SIZE / 2).setScale(0.25, 0.25).setRotation(270)
    item.label = new Text(fighter.name).addChildTo(item).setOrigin(0, 0).setPosition(0, 0)
    return item
  }
  select (selected) {
    const fighter = fighterFind(selected.fighter.id)
    if (state.save.fighters.includes(selected.fighter.id)) {
      // select fighter
      state.save.fighter = fighter.id
      saveData.save()
      this.exit()
    } else {
      // buy fighter
      if (state.save.money >= fighter.price) {
        new Modal(`Are you sure you want to buy ?\n$ ${intToString(fighter.price)}`, ['Buy', 'Cancel'], button => {
          if (button.name === 'Buy') {
            state.save.money -= fighter.price
            state.save.fighters.push(fighter.id)
            state.save.fighter = fighter.id
            saveData.save()
            this.exit()
          }
        }, null)
      } else {
        new Modal('Money is not enough.')
      }
    }
  }
  exit () {
    this.remove()
    this.callback()
  }
}
