import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Gate from '../class/Gate'
const self = {
  index: 7,
  name: 'Mission-07',
  bgm: 'army',
  reward: 7500,
  friendCount: 6,
  created: () => {
    state.field.setField('sublatant_3')
    new AddComputer(1400, 200, 90, 'player', null, self.friendCount)
  },
  update: () => {
  },
  functions: [
    () => {
      new AddComputer(900, 3100, 280, 'enemy', 5, 3)
      new AddComputer(2100, 4500, 260, 'enemy', 6, 4)
      new AddComputer(1500, 6600, 270, 'enemy', 6, 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_1', 5500, 200).setPosition(1500, 5700).setRotation(95).addChildTo(state.field.object),
    () => state.field.is('sublatant_1'),
    () => {
      new AddComputer(4500, 3000, 290, 'enemy', 5, 4)
      new AddComputer(0, 2000, 340, 'enemy', 6, 5)
      new AddComputer(-3000, 1500, 350, 'enemy', 6, 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_2', 1500, 2800).setPosition(500, 200).setRotation(250).addChildTo(state.field.object),
    () => state.field.is('sublatant_2'),
    () => {
      new AddComputer(1500, 200, 90, 'enemy', 7, 6)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_4', 6500, 2800).setPosition(500, 300).setRotation(250).addChildTo(state.field.object),
    () => state.field.is('sublatant_4'),
    () => {
      new AddComputer(5500, 1500, 60, 'enemy', 6, 3)
      new AddComputer(2500, 1200, 30, 'enemy', 6, 5)
      return true
    },
    () => !state.field.enemy.children.length,
    () => {
      new AddComputer(0, 1000, 40, 'enemy', 5, 4)
      new AddComputer(0, 2500, 0, 'enemy', 6, 4)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_6', 3000, 200).setPosition(400, 2800).setRotation(120).addChildTo(state.field.object),
    () => state.field.is('sublatant_6'),
    () => {
      new AddComputer(2800, 2000, 260, 'enemy', 5, 4)
      new AddComputer(1200, 5000, 280, 'enemy', 6, 5)
      new AddComputer(2000, 8000, 270, 'enemy', 6, 6)
      return true
    },
    () => !state.field.enemy.children.length,
    () => new Gate('sublatant_5', 6800, 2000).setPosition(200, 4500).setRotation(180).addChildTo(state.field.object),
    () => state.field.is('sublatant_5'),
    () => {
      new AddComputer(5000, 2300, 360, 'enemy', 5, 2)
      new AddComputer(2500, 1800, 20, 'enemy', 6, 3)
      new AddComputer(0, 2700, 0, 'enemy', 7, 3)
      return true
    },
    () => !state.field.enemy.children.length
  ]
}
export default self
