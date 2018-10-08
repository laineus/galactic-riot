import { settings, colors } from '../config/variables'
import state from '../config/state'
import Radar from './Radar'
import Text from './Text'
export default class InterfaceScreen extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, InterfaceScreen.prototype)
    state.interface = this
    this.lightMask = RectangleShape({
      width: settings.SCREEN_WIDTH,
      height: settings.SCREEN_HEIGHT,
      fill: colors.white,
      strokeWidth: 0,
      padding: 0
    }).setOrigin(0, 0).addChildTo(this)
    this.lightMask.alpha = 0
    this.lightMask.blendMode = 'lighter'
    this.initStatus()
    this.initGauge()
  }
  initRadar (field, player) {
    if (this.radar) this.radar.remove()
    this.radar = new Radar(field, player).setPosition(20, 20).setOrigin(0, 0).addChildTo(this)
  }
  initStatus () {
    this.status = DisplayElement().setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 30, 30).addChildTo(this)
    this.status.keys = new Text(null, 13, { align: 'left' }).setPosition(-180, 20).addChildTo(this.status)
    this.status.keys.update = () => this.status.keys.text = 'Amount:\nKill\nTime:'
    this.status.values = new Text(null, 13, { align: 'right' }).setPosition(-20, 20).addChildTo(this.status)
    this.status.values.update = () => this.status.values.text = `${state.score.amount} / ${state.save.amount}\n${state.score.kill}\n${state.score.time}`
  }
  initGauge () {
    new Text('Energy:', 12).setPosition(13, settings.SCREEN_HEIGHT - 20).setOrigin(0, 1).addChildTo(this)
    this.gauge = this.getGauge().setPosition(20, settings.SCREEN_HEIGHT - 20).setOrigin(0, 1).addChildTo(this)
  }
  getGauge () {
    const gauge = Gauge({
      width: settings.SCREEN_WIDTH - 40,
      height: 1.5,
      cornerRadius: 0,
      maxValue: 100,
      value: 100,
      fill: colors.black_05,
      gaugeColor: colors.white,
      stroke: colors.blue,
      strokeWidth: 0,
      padding: 0
    })
    gauge.blendMode = 'lighter'
    gauge.update = () => {
      gauge.maxValue = state.player.maxHp
      gauge.value = state.player.hp
    }
    return gauge
  }
}
