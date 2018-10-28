import state from '../config/state'
import addComputer from '../utils/addComputer'
import Gate from '../class/Gate'
const self = {
  index: 8,
  name: 'Mission-08',
  reward: 5400,
  friendCount: 6,
  route: 0,
  created: () => {
    state.field.setField('sublatant_3')
    addComputer(1500, 5800, 270, 'player', self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      addComputer(1200, 0, 80, 'enemy', 5)
      addComputer(1800, 3000, 100, 'enemy', 5)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_1', 500, 3800).setPosition(1500, 200).setRotation(270).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
    () => {
      addComputer(3000, 3000, 180, 'enemy', 2)
      addComputer(3900, 2000, 170, 'enemy', 3)
      addComputer(4700, 2500, 180, 'enemy', 2)
      addComputer(5500, 2700, 175, 'enemy', 3)
      addComputer(6500, 3000, 170, 'enemy', 2)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new Gate('sublatant_4', 200, 1500).setPosition(5800, 3000).setRotation(10).addChildTo(state.field.object)
      new Gate('sublatant_6', 2000, 200).setPosition(5000, 3800).setRotation(80).addChildTo(state.field.object)
      return true
    },
    () => {
      if (state.field.is('sublatant_4')) {
        self.route = 1
        return true
      }
      if (state.field.is('sublatant_6')) {
        self.route = 2
        return true
      }
    },
    () => {
      if (self.route === 1) {
        addComputer(8000, 1400, 180, 'enemy', 3)
        addComputer(5500, 1600, 180, 'enemy', 4)
        addComputer(3000, 1500, 180, 'enemy', 5)
      }
      if (self.route === 2) {
        addComputer(1800, 8000, 270, 'enemy', 3)
        addComputer(2200, 5500, 270, 'enemy', 5)
        addComputer(2000, 3000, 270, 'enemy', 5)
      }
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      if (self.route === 1) new Gate('sublatant_2', 1200, 200).setPosition(6400, 2800).setRotation(80).addChildTo(state.field.object)
      if (self.route === 2) new Gate('sublatant_2', 200, 1200).setPosition(3800, 6400).setRotation(10).addChildTo(state.field.object)
      return true
    },
    () => state.field.is('sublatant_2'),
    () => {
      addComputer(2000, 2000, 225, 'enemy', 6)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      if (self.route === 1) new Gate('sublatant_5', 200, 500).setPosition(1800, 2800).setRotation(45).addChildTo(state.field.object)
      if (self.route === 2) new Gate('sublatant_5', 200, 2000).setPosition(2800, 1800).setRotation(0).addChildTo(state.field.object)
      return true
    },
    () => state.field.is('sublatant_5'),
    () => {
      addComputer(2500, 1500, 180, 'enemy', 2)
      addComputer(6000, 2200, 185, 'enemy', 3)
      addComputer(9000, 1800, 180, 'enemy', 2)
      addComputer(12000, 2700, 190, 'enemy', 3)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_6', 2000, 6800).setPosition(6200, 200).setRotation(270).addChildTo(state.field.object),
    () => state.field.is('sublatant_6'),
    () => {
      addComputer(1000, 3000, 85, 'enemy', 3)
      addComputer(3000, 1000, 95, 'enemy', 4)
      addComputer(1500, -2000, 85, 'enemy', 5)
      addComputer(2500, -6000, 95, 'enemy', 6)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self