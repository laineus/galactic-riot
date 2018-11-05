import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Gate from '../class/Gate'
const self = {
  index: 4,
  name: 'Mission-04',
  reward: 1600,
  friendCount: 4,
  created: () => {
    state.field.setField('sublatant_3')
    new AddComputer(1500, 200, 90, 'player', self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      new AddComputer(1600, 1100, 100, 'enemy', 3)
      new AddComputer(1200, 3500, 80, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(200, 4000, 280, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(-200, -200, 260, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_2', 100, 2800).setPosition(2600, 4700).setRotation(350).addChildTo(state.field.object),
    () => state.field.is('sublatant_2'),
    () => {
      new AddComputer(-250, 200, 170, 'enemy', 3)
      new AddComputer(-200, 850, 160, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_1', 100, 3600).setPosition(2800, 2800).setRotation(340).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
    () => {
      new AddComputer(800, 200, 80, 'enemy', 4)
      new AddComputer(5800, 2200, 180, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(3000, 3800, 270, 'enemy', 4)
      new AddComputer(5800, 3500, 190, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
