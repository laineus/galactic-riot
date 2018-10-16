import state from '../config/state'
import addComputer from '../utils/addComputer'
import Gate from '../class/Gate'
const self = {
  index: 4,
  name: 'Mission-04',
  reward: 1600,
  created: () => {
    state.field.setField('sublatant_3')
    addComputer(1500, 200, 90, 'player', 6)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(1600, 1100, 100, 'enemy', 3)
      addComputer(1200, 3500, 80, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(200, 4000, 280, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(-200, -200, 260, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_2', 100, 2800).setPosition(2600, 4700).setRotation(350).addChildTo(state.field.object),
    () => state.field.is('sublatant_2'),
    () => {
      addComputer(-250, 200, 170, 'enemy', 3)
      addComputer(-200, 850, 160, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_1', 100, 3600).setPosition(2800, 2800).setRotation(340).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
    () => {
      addComputer(800, 200, 80, 'enemy', 4)
      addComputer(5800, 2200, 180, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(3000, 3800, 270, 'enemy', 4)
      addComputer(5800, 3500, 190, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
