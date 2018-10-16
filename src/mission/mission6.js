import state from '../config/state'
import addComputer from '../utils/addComputer'
import Gate from '../class/Gate'
const self = {
  index: 6,
  name: 'Mission-06',
  reward: 3200,
  created: () => {
    state.field.setField('sublatant_1')
    addComputer(200, 2200, 0, 'player', 6)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(3200, 2000, 180, 'enemy', 3)
      addComputer(5000, 3000, 190, 'enemy', 3)
      addComputer(7400, 1600, 170, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_3', 200, 3000).setPosition(5800, 2000).setRotation(0).addChildTo(state.field.object),
    () => state.field.is('sublatant_3'),
    () => {
      addComputer(2000, 1000, 100, 'enemy', 2)
      addComputer(2000, 5000, 260, 'enemy', 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new Gate('sublatant_4', 200, 1600).setPosition(2800, 400).setRotation(350).addChildTo(state.field.object)
      new Gate('sublatant_5', 200, 2600).setPosition(2800, 5600).setRotation(45).addChildTo(state.field.object)
      return true
    },
    () => {
      if (state.field.is('sublatant_4')) {
        self.route = 1
        addComputer(2000, 1600, 180, 'enemy', 2)
        return true
      }
      if (state.field.is('sublatant_5')) {
        self.route = 2
        addComputer(2400, 900, 130, 'enemy', 3)
        addComputer(2400, 3500, 230, 'enemy', 4)
        return true
      }
    },
    () => !state.field.enemy.children.length,
    () => {
      if (self.route === 1) {
        addComputer(6500, 1600, 180, 'enemy', 3)
        return true
      }
      if (self.route === 2) {
        addComputer(6000, 1000, 150, 'enemy', 5)
        addComputer(6000, 3000, 210, 'enemy', 4)
        return true
      }
    },
    () => !state.field.enemy.children.length,
    () => {
      if (self.route !== 1) return true
      new Gate('sublatant_6', 300, 300).setPosition(5800, 2000).setRotation(50).addChildTo(state.field.object)
      return true
    },
    () => {
      if (self.route !== 1) return true
      if (state.field.is('sublatant_6')) {
        addComputer(1500, 2400, 260, 'enemy', 2)
        addComputer(2500, 2800, 270, 'enemy', 2)
        return true
      }
    },
    () => {
      if (self.route !== 1) return true
      if (!state.field.enemy.children.length) {
        addComputer(900, 6800, 260, 'enemy', 2)
        addComputer(3200, 6200, 270, 'enemy', 2)
        return true
      }
    },
    () => {
      if (self.route !== 1) return true
      return !state.field.enemy.children.length
    }
  ]
}
export default self
