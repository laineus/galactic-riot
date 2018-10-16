import state from '../config/state'
import addComputer from '../utils/addComputer'
import Gate from '../class/Gate'
const self = {
  index: 3,
  name: 'Mission-03',
  reward: 1000,
  created: () => {
    state.field.setField('sublatant_1')
    addComputer(200, 3200, 350, 'player', 6)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(-200, 200, 165, 'enemy', 2)
      addComputer(-200, 1600, 170, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(200, -200, 345, 'enemy', 3)
      addComputer(200, 200, 15, 'enemy', 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_2', 100, 100).setPosition(5600, 3400).setRotation(30).addChildTo(state.field.object),
    () => state.field.is('sublatant_2'),
    () => {
      addComputer(-200, -200, 225, 'enemy', 5)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
