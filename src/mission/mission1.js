import state from '../config/state'
import addComputer from '../utils/addComputer'
const self = {
  count: 0,
  created () {
    Player().setPosition(100, 100)
  },
  functions: [
    () => {
      addComputer(-200, 200, 135, 'enemy', 6)
      return true
    },
    () => {
      return state.field.enemy.children.length <= 0
    },
    () => {
      return false
    }
  ]
}
export default self
