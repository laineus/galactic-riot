import variables from '../config/variables'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    // Mission
    this.mission = Mission().addChildTo(this)
  },
  update (app) {
  }
}
