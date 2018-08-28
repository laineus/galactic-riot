import { settings, colors } from '../config/variables'
import state from '../config/state'
import Cursor from './Cursor'
import PauseScene from './PauseScene'
import Box from './Box'
import Text from './Text'
export default class Modal extends PauseScene {
  constructor (select, cancel) {
    super(colors.dark_07)
    Object.setPrototypeOf(this, Modal.prototype)
    this.modal = this.getModal('Are you alright ?', ['OK', 'Cancel'], select, cancel).addChildTo(this)
    state.app.pushScene(this)
  }
  getModal (text, labels, select, cancel) {
    const modal = new Box(480, 150).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    modal.text = new Text(text, 16).setPosition(0, -25).addChildTo(modal)
    const list = labels.map((v, i) => {
      const item = new Box(120, 32).addChildTo(modal)
      item.name = v
      item.text = new Text(v).addChildTo(item)
      if (labels.length === 2) item.x += i === 0 ? -80 : 80
      item.y += 35
      return item
    })
    modal.cursor = new Cursor(list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, current => {
      this.remove()
      this.exit()
      if (select) select(current)
    }, () => {
      this.remove()
      this.exit()
      if (cancel) cancel()
    }, false).addChildTo(modal)
    return modal
  }
}
