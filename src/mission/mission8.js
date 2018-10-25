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
    () => new Gate('sublatant_1', 500, 3800).setPosition(1500, 200).setRotation(270).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
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
      if (self.route === 1) new Gate('sublatant_2', 1200, 200).setPosition(6400, 2800).setRotation(80).addChildTo(state.field.object)
      if (self.route === 2) new Gate('sublatant_2', 200, 1200).setPosition(3800, 6400).setRotation(10).addChildTo(state.field.object)
      return true
    },
    () => state.field.is('sublatant_2'),
    () => {
      if (self.route === 1) new Gate('sublatant_5', 200, 500).setPosition(1800, 2800).setRotation(45).addChildTo(state.field.object)
      if (self.route === 2) new Gate('sublatant_5', 200, 2000).setPosition(2800, 1800).setRotation(0).addChildTo(state.field.object)
      return true
    },
    () => state.field.is('sublatant_5'),
    () => new Gate('sublatant_6', 2000, 6800).setPosition(6200, 200).setRotation(270).addChildTo(state.field.object),
    () => state.field.is('sublatant_6')
  ]
}
export default self
