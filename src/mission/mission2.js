import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Gate from '../class/Gate'
const self = {
  index: 2,
  name: 'Mission-02',
  reward: 600,
  friendCount: 3,
  created: () => {
    state.field.setField('sublatant_3')
    new new AddComputer(1000, -200, 280, 'player', null, self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      new AddComputer(1600, -600, 270, 'enemy', 1, 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(1200, 3700, 260, 'enemy', 2, 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_4', 200, 1500).setPosition(1500, 300).setRotation(10).addChildTo(state.field.object),
    () => state.field.is('sublatant_4'),
    () => {
      new AddComputer(1100, 1700, 340, 'enemy', 1, 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(2500, 1400, 10, 'enemy', 2, 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
