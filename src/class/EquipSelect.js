import { colors, settings, fighters, weapons, attachments } from '../config/variables'
import state from '../config/state'
import intToString from '../utils/intToString'
import saveData from '../utils/saveData'
import maskImage from '../utils/maskImage'
import Cursor from './Cursor'
import Box from './Box'
import Text from './Text'
import BlurText from './BlurText'
import Modal from './Modal'
const SIZE = 100
const MARGIN = 15
export default class EquipSelect extends Box {
  constructor (key, callback) {
    super(null, null, colors.dark_05)
    Object.setPrototypeOf(this, EquipSelect.prototype)
    this.key = key
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.callback = callback
    const defaultIndex = this.products.findIndex(v => v.id === state.save[this.key])
    const width = (this.products.length * SIZE) + ((this.products.length - 1) * MARGIN)
    this.group = DisplayElement().addChildTo(this)
    this.group.setPosition(width / -2, SIZE / -2)
    this.group.list = this.products.map((product, i) => this.item(product).addChildTo(this.group).setPosition(i * (SIZE + MARGIN), 0))
    this.group.cursor = new Cursor(this.group.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, this.select.bind(this), this.exit.bind(this), false, defaultIndex).addChildTo(this)
  }
  get products () {
    switch (this.key) {
      case 'fighter': return fighters
      case 'weapon': return weapons
      case 'attachment': return attachments
    }
    return null
  }
  item (product) {
    const item = new Box(SIZE, SIZE, colors.black_05).setOrigin(0, 0)
    item.product = product
    item.img = this.bought(product.id) ? Sprite(product.img) : maskImage.getSprite(product.img, colors.black)
    item.img.addChildTo(item).setPosition(SIZE / 2, SIZE / 2).setScale(0.25, 0.25).setRotation(270)
    if (!this.bought(product.id)) {
      item.lock = new Box(SIZE, 40, colors.dark_07).addChildTo(item).setPosition(SIZE / 2, SIZE / 2)
      item.lock.img = Sprite('lock').addChildTo(item.lock).setScale(0.16, 0.16).setPosition(0, -9)
      item.lock.price = new Text(`$ ${intToString(product.price)}`, 13).addChildTo(item.lock).setPosition(0, 11)
    }
    const option = this.bought(product.id) ? {} : { fill: colors.gray, shadow: 'transparent' }
    item.label = new BlurText(product.name, 12, option).addChildTo(item).setOrigin(0, 0).setPosition(0, 0)
    return item
  }
  bought (id) {
    return state.save[`${this.key}s`].includes(id)
  }
  select (selected) {
    const product = this.products.find(v => v.id === selected.product.id)
    if (this.bought(product.id)) {
      // select product
      state.save[this.key] = product.id
      saveData.save()
      this.exit()
    } else {
      // buy product
      if (state.save.money >= product.price) {
        new Modal(`Are you sure you want to buy ?\n$ ${intToString(product.price)}`, ['Buy', 'Cancel'], button => {
          if (button.name === 'Buy') {
            state.save.money -= product.price
            state.save[`${this.key}s`].push(product.id)
            state.save[this.key] = product.id
            saveData.save()
            this.exit()
          }
        }, null, 1)
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
