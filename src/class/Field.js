import state from '../config/state'
import { fields } from '../config/variables'
import InterfaceField from './InterfaceField'
import Tile from './Tile'
import removeChildren from '../utils/removeChildren'
export default class Field extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, Field.prototype)
    state.field = this
    // Layer
    this.friend = DisplayElement().addChildTo(this)
    this.enemy = DisplayElement().addChildTo(this)
    this.bullet = DisplayElement().addChildTo(this)
    this.object = DisplayElement().addChildTo(this)
    // Interface
    this.interfaceField = new InterfaceField().addChildTo(this)
  }
  setField (fieldName) {
    this.fieldName = fieldName
    const fieldSrc = fields[fieldName]
    this.width = fieldSrc.width
    this.height = fieldSrc.height
    removeChildren(this.enemy)
    removeChildren(this.bullet)
    removeChildren(this.object)
    if (this.bg) this.bg.remove()
    if (this.fg) this.fg.remove()
    this.bg = new Tile('map1_bg', this.width, this.height).addChildTo(this).setOrigin(0, 0)
    this.fg = new Tile('map1_fg', this.width * 1.5, this.height * 1.5).addChildTo(this).setOrigin(0, 0)
    this.fg.update = () => {
      if (!this.camera) return
      this.fg.x = this.x * 50 / this.camera.zoom
      this.fg.y = this.y * 50 / this.camera.zoom
    }
  }
  is (fieldName) {
    return this.fieldName === fieldName
  }
  notInField (obj, padding = 0) {
    return obj.x < padding || obj.x > (this.width - padding) || obj.y < padding || obj.y > (this.height - padding)
  }
  inField (obj, padding = 0) {
    return obj.x >= padding && obj.x <= (this.width - padding) && obj.y >= padding && obj.y <= (this.height - padding)
  }
  get xCenter () {
    return this.width / 2
  }
  get yCenter () {
    return this.height / 2
  }
}
