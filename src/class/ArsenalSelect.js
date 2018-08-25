import { settings, colors } from '../config/variables'
import Cursor from './Cursor'
import BlurLabel from './BlurLabel'
export default class ArsenalSelect extends phina.display.DisplayElement {
  constructor (scene, cancel) {
    super()
    Object.setPrototypeOf(this, ArsenalSelect.prototype)
    const LABELS = ['Fighter', 'Main Weapon', 'Sub Weapon', 'Military Force', 'Exit']
    this.setPosition(settings.SCREEN_WIDTH_C - 200, settings.SCREEN_HEIGHT_C - ((LABELS.length * 38) / 2))
    const list = LABELS.map((name, i) => this.item(name).addChildTo(this).setPosition(0, i * 38))
    this.cursor = new Cursor(list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, (current) => {
      if (current.label.text === 'Exit') cancel()
    }, cancel).addChildTo(this)
  }
  item (name) {
    const item = RectangleShape({
      width: 400,
      height: 32,
      fill: colors.black_05,
      stroke: null,
      strokeWidth: 2,
      padding: 0
    }).setOrigin(0, 0)
    item.active = false
    item.label = new BlurLabel({
      text: name,
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: colors.white
    }).addChildTo(item).setOrigin(0, 0).setPosition(10, 0)
    item.update = () => {
      const color = item.active ? colors.blue : 'transparent'
      item.stroke = color
      item.children.forEach(v => v.shadowColor = color)
    }
    return item
  }
}
