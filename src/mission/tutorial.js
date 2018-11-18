import state from '../config/state'
import AddComputer from '../utils/AddComputer'
import Text from '../class/Text'
import Gate from '../class/Gate'
import VerticalSub from '../class/VerticalSub'
import { settings } from '../config/variables'
const self = {
  index: 0,
  name: 'Tutorial',
  bgm: 'title',
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
  setSub: (text = '') => {
    self.subtitle.text = text
    return true
  },
  setJa: (ja = '') => {
    self.ja.text = ja
    return true
  },
  functions: [
    () => {
      self.subtitle = new Text('', 14).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT - 50).addChildTo(state.interface)
      self.ja = new VerticalSub('').addChildTo(state.interface).setPosition(settings.SCREEN_WIDTH - 30, settings.SCREEN_HEIGHT_C)
      return true
    },
    () => self.wait(10),
    () => self.setSub('- Tutorial -'),
    () => self.setJa('- 操作方法説明 -'),
    () => self.wait(80),
    () => self.setSub('[LEFT][RIGHT]： Turn'),
    () => self.setJa('[左キー][右キー]： 旋回'),
    () => {
      if (state.player.turnDirection < 0) self.condition.left++
      if (state.player.turnDirection > 0) self.condition.right++
      return self.condition.left > 30 && self.condition.right > 30
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('[UP] / [DOWN]： Speed up / down'),
    () => self.setJa('[上キー]・[下キー]： 加速・減速'),
    () => {
      if (state.player.speedDirection < 0) self.condition.up++
      if (state.player.speedDirection > 0) self.condition.down++
      return self.condition.up > 30 && self.condition.down > 30
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('[DOWN] + [LEFT/RIGHT]： Sharp turn'),
    () => self.setJa('[下キー] + [左右キー]： 急旋回'),
    () => {
      return (state.player.speedDirection < 0 && state.player.turnDirection !== 0)
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('[X]： Boost'),
    () => self.setJa('[X]： ブースト'),
    () => {
      if ((state.player.speedDirection >= 0) && (state.player.turnDirection === 0) && (state.player.turnBoost === 10)) self.condition.boost++
      return self.condition.boost > 1
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('[LEFT/RIGHT] + [X]： Boost turn'),
    () => self.setJa('[左右キー] + [X]： ブーストターン'),
    () => {
      if ((state.player.speedDirection >= 0) && (state.player.turnDirection !== 0) && (state.player.turnBoost === 10)) self.condition.boostTurn++
      return self.condition.boostTurn > 1
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('[Down] + [X]： Back Boost'),
    () => self.setJa('[下キー] + [X]： バックブースト'),
    () => {
      if ((state.player.speedDirection < 0) && (state.player.turnBoost === 10)) self.condition.backBoost++
      return self.condition.backBoost > 1
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('[Z]： Laser'),
    () => self.setJa('[Z]： レーザー'),
    () => {
      if (state.player.weaponDelay === 1) self.condition.laser++
      return self.condition.laser > 10
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('Let\'s go through the gate in the direction of the arrow.'),
    () => self.setJa('画面上の矢印の先にあるゲートをくぐりましょう'),
    () => new Gate('sublatant_4', 200, 1500).setPosition(4500, 2000).setRotation(0).addChildTo(state.field.object),
    () => state.field.is('sublatant_4'),
    () => {
      new AddComputer(1000, 1350, 10, 'enemy', 1, 1)
      return true
    },
    () => self.setSub() && self.setJa(),
    () => self.wait(30),
    () => self.setSub('Let\'s shoot down the glowing red enemy.'),
    () => self.setJa('赤く光っている敵機を撃墜してみましょう'),
    () => self.wait(120),
    () => !state.field.enemy.children.length,
    () => self.setSub() && self.setJa()
  ]
}
export default self
