import Result from './Result'
import { colors, settings } from '../config/variables'
export default class OnlineRespawn extends Result {
  constructor () {
    super(false)
    Object.setPrototypeOf(this, OnlineRespawn.prototype)
    this.setTitle(`- Downed -`)
    this.gauge = Gauge({
      width: 200,
      height: 2,
      cornerRadius: 0,
      maxValue: 1,
      value: 0,
      fill: '#333',
      gaugeColor: colors.white,
      x: settings.SCREEN_WIDTH_C,
      y: settings.SCREEN_HEIGHT_C + 10,
      strokeWidth: 0
    }).addChildTo(this)
    this.gauge.animationTime = 200
  }
}
