import state from '../config/state'
import addComputer from '../utils/addComputer'
const self = {
  index: 1,
  name: 'Mission-01',
  reward: 300,
  friendCount: 3,
  created: () => {
    state.field.setField('sublatant_1')
    addComputer(2500, 2500, 350, 'player', self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(-2500, 2500, 315, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(2500, -2500, 135, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
