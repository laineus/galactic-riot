import { settings, colors } from '../config/variables'
export default class Result extends phina.display.RectangleShape {
  constructor (green) {
    super({
      width: settings.SCREEN_WIDTH,
      height: settings.SCREEN_HEIGHT,
      fill: green ? 'rgba(0, 70, 30, 0.5)' : 'rgba(100, 0, 0, 0.5)',
      strokeWidth: 0,
      padding: 0
    })
    Object.setPrototypeOf(this, Result.prototype)
    this.setOrigin(0, 0)
  }
  setTitle (text) {
    this.title = Label({
      text: text,
      fontFamily: 'aldrich',
      fontSize: 18,
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 1).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C - 100).addChildTo(this)
  }
  setKey (text) {
    this.resultKey = Label({
      text: text,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'left',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C - 80, settings.SCREEN_HEIGHT_C - 30).addChildTo(this)
  }
  setValue (text) {
    this.resultValue = Label({
      text: text,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'right',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C + 80, settings.SCREEN_HEIGHT_C - 30).addChildTo(this)
  }
}
