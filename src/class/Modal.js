import { settings, colors } from '../config/variables'
import state from '../config/state'
import Cursor from './Cursor'
import PauseScene from './PauseScene'
import Box from './Box'
import BlurText from './BlurText'
import VerticalSub from './VerticalSub'
export default class Modal extends PauseScene {
  constructor (text, ja, options, select, cancel, index = 0) {
    super(colors.dark_05)
    Object.setPrototypeOf(this, Modal.prototype)
    if (!options) options = ['OK']
    this.modal = this.getModal(text, options, select, cancel, index).addChildTo(this)
    this.ja = new VerticalSub(ja).addChildTo(this).setPosition(settings.SCREEN_WIDTH - 30, settings.SCREEN_HEIGHT_C)
    state.app.pushScene(this)
  }
  getModal (text, labels, select, cancel, index) {
    const modal = new Box(480, 150).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    modal.text = new BlurText(text, 16).setPosition(0, -25).addChildTo(modal)
    const list = labels.map((v, i) => {
      const item = new Box(120, 32).addChildTo(modal)
      item.name = v
      item.text = new BlurText(v).addChildTo(item)
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
    }, false, index).addChildTo(modal)
    return modal
  }
}
