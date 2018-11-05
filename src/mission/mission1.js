import state from '../config/state'
import AddComputer from '../utils/AddComputer'
const self = {
  index: 1,
  name: 'Mission-01',
  reward: 300,
  friendCount: 3,
  created: () => {
    state.field.setField('sublatant_1')
    new AddComputer(2500, 2500, 350, 'player', null, self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      new AddComputer(-2500, 2500, 315, 'enemy', 1, 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(2500, -2500, 135, 'enemy', 1, 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
