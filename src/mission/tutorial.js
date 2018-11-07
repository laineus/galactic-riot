import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Text from '../class/Text'
import { settings } from '../config/variables'
const self = {
  index: 0,
  name: 'Tutorial',
  reward: 0,
  friendCount: 1,
  timer: 0,
  condition: {
    left: 0,
    right: 0,
    up: 0,
    down: 0,
    boost: 0,
    boostTurn: 0,
    backBoost: 0,
    laser: 0
  },
  created: () => {
    state.field.setField('sublatant_1')
    new AddComputer(2500, 2500, 350, 'player', null, self.friendCount)
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
      if (state.player.turnDirection < 0) self.condition.left++
      if (state.player.turnDirection > 0) self.condition.right++
      return self.condition.left > 30 && self.condition.right > 30
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('[上キー][下キー]： 加速・減速'),
    () => {
      if (state.player.speedDirection < 0) self.condition.up++
      if (state.player.speedDirection > 0) self.condition.down++
      return self.condition.up > 30 && self.condition.down > 30
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
      if ((state.player.speedDirection >= 0) && (state.player.turnDirection === 0) && (state.player.turnBoost === 10)) self.condition.boost++
      return self.condition.boost > 1
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('旋回 + ブースト： ブーストターン', '[左右キー] + [X]                                     '),
    () => {
      if ((state.player.speedDirection >= 0) && (state.player.turnDirection !== 0) && (state.player.turnBoost === 10)) self.condition.boostTurn++
      return self.condition.boostTurn > 1
    },
    () => self.setSub(''),
    () => self.wait(30),
    () => self.setSub('減速 + ブースト： バックブースト', '[下キー] + [X]                                     '),
    () => {
      if ((state.player.speedDirection < 0) && (state.player.turnBoost === 10)) self.condition.backBoost++
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
      new AddComputer(3000, 1500, 180, 'enemy', 1, 1)
      return true
    },
    () => self.setSub('赤く光っている敵機を撃墜してみましょう'),
    () => self.wait(120),
    () => !state.field.enemy.children.length,
    () => self.setSub('')
  ]
}
export default self
