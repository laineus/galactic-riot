import state from '../config/state'
import addComputer from '../utils/addComputer'
import Text from '../class/Text'
import { settings } from '../config/variables'
const self = {
  index: 0,
  name: 'Tutorial',
  reward: 0,
  friendCount: 1,
  timer: 0,
  condition: {
    left: false,
    right: false,
    up: false,
    down: false,
    boost: 0,
    boostTurn: 0,
    backBoost: 0,
    laser: 0
  },
  created: () => {
    state.field.setField('sublatant_1')
    addComputer(2500, 2500, 350, 'player', self.friendCount)
  },
  update: () => {
  },
  wait: count => {
    if (self.timer === 0) self.timer = count
    self.timer--
    return self.timer <= 0
  },
  setSub: (text = '', ruby = '') => {
    self.subtitle.text = text
    self.subtitle.ruby.text = ruby
    return true
  },
  functions: [
    () => {
      self.subtitle = new Text('', 14).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT - 50).addChildTo(state.interface)
      self.subtitle.ruby = new Text('', 7).setPosition(0, -20).addChildTo(self.subtitle)
      return true
    },
    () => self.wait(10),
    () => self.setSub('操作方法を説明します'),
    () => self.wait(80),
    () => self.setSub('[左キー][右キー]： 旋回'),
    () => {
      if (state.player.turnDirection < 0) self.condition.left = true
      if (state.player.turnDirection > 0) self.condition.right = true
      return self.condition.left && self.condition.right
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('[上キー][下キー]： 加速・減速'),
    () => {
      if (state.player.speedDirection < 0) self.condition.up = true
      if (state.player.speedDirection > 0) self.condition.down = true
      return self.condition.up && self.condition.down
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('減速 + 旋回： 急旋回', '[下キー] + [左右キー]             '),
    () => {
      return (state.player.speedDirection < 0 && state.player.turnDirection !== 0)
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('[X]： ブースト'),
    () => {
      if ((state.player.speedDirection >= 0) && (state.player.turnDirection === 0) && (state.player.turnBoost === 19)) self.condition.boost++
      return self.condition.boost > 1
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('ブースト + 旋回： ブーストターン', '[X] + [左右キー]                                     '),
    () => {
      if ((state.player.speedDirection >= 0) && (state.player.turnDirection !== 0) && (state.player.turnBoost === 19)) self.condition.boostTurn++
      return self.condition.boostTurn > 1
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('ブースト + 減速： バックブースト', '[X] + [下キー]                                     '),
    () => {
      if ((state.player.speedDirection < 0) && (state.player.turnBoost === 19)) self.condition.backBoost++
      return self.condition.backBoost > 1
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('[Z]： レーザー'),
    () => {
      if (state.player.weaponDelay === 1) self.condition.laser++
      return self.condition.laser > 10
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => {
      addComputer(3000, 1500, 180, 'enemy', 1)
      return true
    },
    () => self.setSub('赤く光っている敵機を撃墜してみましょう'),
    () => self.wait(120),
    () => !state.field.enemy.children.length,
    () => self.setSub('')
  ]
}
export default self
