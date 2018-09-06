import { settings, colors } from '../config/variables'
import state from '../config/state'
export default class MissionResult extends phina.display.RectangleShape {
  constructor (scene, completed) {
    super({
      width: settings.SCREEN_WIDTH,
      height: settings.SCREEN_HEIGHT,
      fill: completed ? 'rgba(0, 70, 30, 0.5)' : 'rgba(100, 0, 0, 0.5)',
      strokeWidth: 0,
      padding: 0
    })
    Object.setPrototypeOf(this, MissionResult.prototype)
    this.scene = scene
    this.time = 0
    this.setOrigin(0, 0)
    this.title = Label({
      text: `- Mission ${completed ? 'Completed' : 'Failed'} -`,
      fontFamily: 'aldrich',
      fontSize: 18,
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 1).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C - 70).addChildTo(this)
    this.resultKey = Label({
      text: completed ? this.completedKeyString : this.failedKeyString,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'left',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C - 80, settings.SCREEN_HEIGHT_C).addChildTo(this)
    this.resultValue = Label({
      text: completed ? this.completedValueString : this.failedValueString,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'right',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C + 80, settings.SCREEN_HEIGHT_C).addChildTo(this)
  }
  update (app) {
    this.time++
    if (this.time > 60 && app.keyboard.getKeyDown('Z')) {
      this.scene.exit('Title', { skip: 1 })
    }
  }
  get completedKeyString () {
    return 'Time:\nKill:\nMember Death:\nRescue:\n\nRank:\nReward:'
  }
  get failedKeyString () {
    return 'Loss:'
  }
  get completedValueString () {
    return `${state.score.time}\n${state.score.kill}\n${state.score.death}\n${state.score.rescue}\n\n${'A'}\n${1000}`
  }
  get failedValueString () {
    return `$${1000}`
  }
}
// Time: +50
// Kill: +3
// Member Death: -3
// Rescue: +2

// S 90-
// A 70-90
// B 50-70
// C 30-50
// D -30
