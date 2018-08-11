import state from '../config/state'
import addComputer from '../utils/addComputer'
const self = {
  name: 'Mission-01',
  count: 0,
  created () {
    addComputer(200, 3200, 350, 'player', 6)
    Gate().setPosition(1000, 3200).addChildTo(state.field)
  },
  functions: [
    () => {
      addComputer(-200, 200, 165, 'enemy', 6)
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
