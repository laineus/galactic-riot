import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init (fieldSrc) {
    this.superInit()
    state.field = this
    this.width = fieldSrc.width
    this.height = fieldSrc.height
    this.bg = Tile('map1_bg', this.width, this.height).addChildTo(this).setOrigin(0, 0)
    this.fg = Tile('map1_fg', this.width * 1.5, this.height * 1.5).addChildTo(this).setOrigin(0, 0)
    this.fg.update = () => {
      this.fg.x = this.x * 50 / this.camera.zoom
      this.fg.y = this.y * 50 / this.camera.zoom
    }
    // Layer
    this.friend = DisplayElement().addChildTo(this)
    this.enemy = DisplayElement().addChildTo(this)
    this.bullet = DisplayElement().addChildTo(this)
  },
  update () {
  }
}
