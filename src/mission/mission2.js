import state from '../config/state'
import addComputer from '../utils/addComputer'
import Gate from '../class/Gate'
const self = {
  name: 'Mission-02',
  created: () => {
    state.field.setField('sublatant_3')
    addComputer(1000, -200, 280, 'player', 6)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(1600, -600, 270, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(1200, 3700, 260, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_4', 200, 1500).setPosition(1500, 300).setRotation(10).addChildTo(state.field.object),
    () => state.field.is('sublatant_4'),
    () => {
      addComputer(1100, 1700, 340, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      addComputer(2500, 1400, 10, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
