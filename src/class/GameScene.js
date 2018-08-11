import variables from '../config/variables'
import fields from '../config/fields'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    // Field
    this.field = Field(fields.sublatant_1).addChildTo(this)
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
