import { settings, colors } from '../config/variables'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = colors.black
    Label({
      text: 'NOW LOADING...',
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: colors.white,
      x: settings.SCREEN_WIDTH_C,
      y: settings.SCREEN_HEIGHT_C - 10
    }).addChildTo(this)
    const gauge = Gauge({
      width: 124,
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
    const loader = AssetLoader()
    loader.onprogress = e => gauge.value = e.progress
    loader.onload = () => setTimeout(() => this.onLoad(), 100)
    loader.load(option.assets)
  },
  onLoad () {
    this.flare('loaded')
  }
}
