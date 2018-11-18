import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Gate from '../class/Gate'
const self = {
  index: 3,
  name: 'Mission-03',
  bgm: 'riot',
  reward: 2600,
  friendCount: 4,
  created: () => {
    state.field.setField('sublatant_1')
    new AddComputer(200, 3200, 350, 'player', null, self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      new AddComputer(-200, 200, 165, 'enemy', 2, 2)
      new AddComputer(-200, 1600, 170, 'enemy', 3, 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(200, -200, 345, 'enemy', 2, 3)
      new AddComputer(200, 200, 15, 'enemy', 3, 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_2', 100, 100).setPosition(5600, 3400).setRotation(30).addChildTo(state.field.object),
    () => state.field.is('sublatant_2'),
    () => {
      new AddComputer(-200, -200, 225, 'enemy', 3, 5)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
