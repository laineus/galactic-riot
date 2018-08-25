import { settings, colors } from '../config/variables'
export default class MissionResult extends phina.display.RectangleShape {
  constructor (completed, keyString, valueString) {
    super({
      width: settings.SCREEN_WIDTH,
      height: settings.SCREEN_HEIGHT,
      fill: completed ? 'rgba(0, 70, 30, 0.5)' : 'rgba(100, 0, 0, 0.5)',
      strokeWidth: 0,
      padding: 0
    })
    Object.setPrototypeOf(this, MissionResult.prototype)
    this.setOrigin(0, 0)
    this.title = Label({
      text: `- Mission ${completed ? 'Completed' : 'Failed'} -`,
      fontFamily: 'aldrich',
      fontSize: 18,
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 1).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C - 70).addChildTo(this)
    this.resultKey = Label({
      text: keyString,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'left',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C - 80, settings.SCREEN_HEIGHT_C).addChildTo(this)
    this.resultValue = Label({
      text: valueString,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'right',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C + 80, settings.SCREEN_HEIGHT_C).addChildTo(this)
  }
}
