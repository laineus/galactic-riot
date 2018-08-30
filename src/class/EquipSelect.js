import { colors, settings, fighters, mainWeapons, subWeapons } from '../config/variables'
import state from '../config/state';
import intToString from '../utils/intToString'
import saveData from '../utils/saveData'
import Cursor from './Cursor'
import Box from './Box'
import Text from './Text'
import Modal from './Modal'
const SIZE = 120
const MARGIN = 15
export default class EquipSelect extends Box {
  constructor (key, callback) {
    super(null, null, colors.dark_05)
    Object.setPrototypeOf(this, EquipSelect.prototype)
    this.key = this.convertKey(key)
    this.products = this.getProducts(key)
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
  convertKey (key) {
    switch (key) {
      case 'fighter': return 'fighter'
      case 'main': return 'mainWeapon'
      case 'sub': return 'subWeapon'
    }
  }
  getProducts (key) {
    switch (key) {
      case 'fighter': return fighters
      case 'main': return mainWeapons
      case 'sub': return subWeapons
    }
    return null
  }
  item (product) {
    const item = new Box(SIZE, SIZE, colors.black_05).setOrigin(0, 0)
    item.product = product
    item.img = Sprite(product.img).addChildTo(item).setPosition(SIZE / 2, SIZE / 2).setScale(0.25, 0.25).setRotation(270)
    item.label = new Text(product.name).addChildTo(item).setOrigin(0, 0).setPosition(0, 0)
    return item
  }
  select (selected) {
    const product = this.products.find(v => v.id === selected.product.id)
    if (state.save[`${this.key}s`].includes(selected.product.id)) {
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
