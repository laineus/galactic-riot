import state from '../config/state'
import { fields } from '../config/variables'
import Tile from './Tile'
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
    this.interfaceField = InterfaceField().addChildTo(this)
  }
  setField (fieldName) {
    this.fieldName = fieldName
    const fieldSrc = fields[fieldName]
    this.width = fieldSrc.width
    this.height = fieldSrc.height
    this.enemy.children.clear()
    this.bullet.children.clear()
    this.object.children.clear()
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
}
