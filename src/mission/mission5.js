import state from '../config/state'
import addComputer from '../utils/addComputer'
import Gate from '../class/Gate'
const self = {
  index: 5,
  name: 'Mission-05',
  reward: 2400,
  created: () => {
    state.field.setField('sublatant_4')
    addComputer(6800, 1200, 170, 'player', 6)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(5400, 200, 80, 'enemy', 2)
      addComputer(5400, 2800, 275, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(3800, 200, 70, 'enemy', 2)
      addComputer(2500, 2800, 310, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(200, 1300, 10, 'enemy', 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_1', 5800, 200).setPosition(300, 2700).setRotation(145).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
    () => {
      addComputer(200, 2600, 340, 'enemy', 3)
      addComputer(600, 3700, 325, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(4500, 1800, 170, 'enemy', 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_3', 2600, 5800).setPosition(400, 1000).setRotation(250).addChildTo(state.field.object),
    () => state.field.is('sublatant_3'),
    () => {
      addComputer(1600, 3700, 95, 'enemy', 3)
      addComputer(1400, 1800, 85, 'enemy', 5)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(2100, 400, 100, 'enemy', 2)
      addComputer(900, 600, 80, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
