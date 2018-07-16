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
    this.field = state.field = Tile('map', width, height).addChildTo(this).setOrigin(0, 0)
    this.field.width = width
    this.field.height = height
    // Interface
    this.field.interface = Interface().addChildTo(this.field)
    // Layer
    this.field.friend = DisplayElement().addChildTo(this.field)
    this.field.enemy = DisplayElement().addChildTo(this.field)
    this.field.bullet = DisplayElement().addChildTo(this.field)
    // Fighter
    this.field.player = Player()
    this.field.camera = Camera(this.field, this.field.player).addChildTo(this)
    Number(40).times(() => this.randomComputer(['friend', 'enemy'].pickup()))
    this.computerRespone()
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
