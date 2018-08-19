import state from '../config/state'
import addComputer from '../utils/addComputer'
const self = {
  name: 'Mission-01',
  count: 0,
  created: () => {
    state.field.setField('sublatant_1')
    addComputer(200, 3200, 350, 'player', 6)
  },
  update: () => {
    if (state.field.friend.children.length < 5) {
      addComputer(null, null, null, 'friend', Math.randint(1, 6))
    }
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
    () => Gate('sublatant_2', 100, 100).setPosition(5600, 3400).setRotation(30).addChildTo(state.field.object),
    () => state.field.is('sublatant_2'),
    () => {
      addComputer(-200, -200, 225, 'enemy', 5)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      return false
    }
  ]
}
export default self
