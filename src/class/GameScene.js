import { colors } from '../config/variables'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = colors.black
    // Mission
    this.mission = Mission().addChildTo(this)
  }
}
