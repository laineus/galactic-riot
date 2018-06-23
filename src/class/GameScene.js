import variables from '../config/variables'
import state from '../config/state'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    this.player = Player().addChildTo(this).setField(this)
  }
}
