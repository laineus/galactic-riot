import variables from '../config/variables'
import state from '../config/state'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    // Field
    const width = 6000
    const height = 4000
    this.field = state.field = DisplayElement().addChildTo(this)
    this.field.bg = Tile('map1_bg', width, height).addChildTo(this.field).setOrigin(0, 0)
    this.field.fg = Tile('map1_fg', width * 1.5, height * 1.5).addChildTo(this.field).setOrigin(0, 0)
    this.field.fg.update = () => {
      this.field.fg.x = this.field.x * 50 / this.field.camera.zoom
      this.field.fg.y = this.field.y * 50 / this.field.camera.zoom
    }
    this.field.width = width
    this.field.height = height
    // Layer
    this.field.friend = DisplayElement().addChildTo(this.field)
    this.field.enemy = DisplayElement().addChildTo(this.field)
    this.field.bullet = DisplayElement().addChildTo(this.field)
    // Camera
    this.field.camera = Camera()
    // Player()
    // Number(40).times(() => this.randomComputer(['friend', 'enemy'].pickup()))
    // this.computerRespone()
    // Mission
    this.mission = Mission().addChildTo(this)
    // Interface
    this.interface = InterfaceScreen().addChildTo(this)
    this.field.interface = InterfaceField().addChildTo(this.field)
  },
  update (app) {
  },
  randomComputer (type) {
    if (this.field[type].children.length < 20) Computer().setType(type)
  },
  computerRespone () {
    this.randomComputer(['friend', 'enemy'].pickup())
    setTimeout(() => this.computerRespone(), Math.randint(1000, 2000))
  }
}
