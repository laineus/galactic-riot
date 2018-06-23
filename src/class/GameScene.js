import variables from '../config/variables'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
  }
}
