import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Gate from '../class/Gate'
const self = {
  index: 5,
  name: 'Mission-05',
  reward: 2400,
  friendCount: 5,
  created: () => {
    state.field.setField('sublatant_4')
    new AddComputer(6800, 1200, 170, 'player', null, self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      new AddComputer(5400, 200, 80, 'enemy', 4, 2)
      new AddComputer(5400, 2800, 275, 'enemy', 5, 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(3800, 200, 70, 'enemy', 4, 2)
      new AddComputer(2500, 2800, 310, 'enemy', 5, 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(200, 1300, 10, 'enemy', 5, 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_1', 5800, 200).setPosition(300, 2700).setRotation(145).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
    () => {
      new AddComputer(200, 2600, 340, 'enemy', 4, 3)
      new AddComputer(600, 3700, 325, 'enemy', 5, 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(4500, 1800, 170, 'enemy', 4, 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_3', 2600, 5800).setPosition(400, 1000).setRotation(250).addChildTo(state.field.object),
    () => state.field.is('sublatant_3'),
    () => {
      new AddComputer(1600, 3700, 95, 'enemy', 4, 3)
      new AddComputer(1400, 1800, 85, 'enemy', 5, 5)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(2100, 400, 100, 'enemy', 4, 2)
      new AddComputer(900, 600, 80, 'enemy', 5, 2)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
