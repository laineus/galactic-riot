import { settings } from '../config/variables'
import Cursor from './Cursor'
import Box from './Box'
import Text from './Text'
export default class Modal extends Box {
  constructor (select, cancel) {
    super(480, 150)
    Object.setPrototypeOf(this, Modal.prototype)
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    new Text('Are you alright ?', 16).setPosition(0, -25).addChildTo(this)
    const labels = ['OK', 'Cancel']
    const list = labels.map((v, i) => {
      const item = new Box(120, 32).addChildTo(this)
      new Text(v).addChildTo(item)
      if (labels.length === 2) item.x += i === 0 ? -80 : 80
      item.y += 35
      return item
    })
    this.cursor = new Cursor(list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, select, cancel, false).addChildTo(this)
  }
  update () {
  }
}
