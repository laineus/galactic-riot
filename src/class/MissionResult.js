import { settings, colors } from '../config/variables'
import state from '../config/state'
import saveData from '../utils/saveData'
import intToString from '../utils/intToString'
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
    if (completed) {
      state.save.mission = Math.max(state.mission.index, state.save.mission)
      state.save.money += state.mission.reward
      saveData.save()
    } else {
      state.save.money = Math.max(state.save.money - this.lost, 0)
      saveData.save()
    }
    this.scene = scene
    this.time = 0
    this.setOrigin(0, 0)
    this.title = Label({
      text: `- Mission ${completed ? 'Completed' : 'Failed'} -`,
      fontFamily: 'aldrich',
      fontSize: 18,
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 1).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C - 100).addChildTo(this)
    this.resultKey = Label({
      text: completed ? this.completedKeyString : this.failedKeyString,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'left',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C - 80, settings.SCREEN_HEIGHT_C - 30).addChildTo(this)
    this.resultValue = Label({
      text: completed ? this.completedValueString : this.failedValueString,
      fontFamily: 'aldrich',
      fontSize: 13,
      align: 'right',
      fill: colors.white,
      padding: 0
    }).setOrigin(0.5, 0).setPosition(settings.SCREEN_WIDTH_C + 80, settings.SCREEN_HEIGHT_C - 30).addChildTo(this)
  }
  update (app) {
    this.time++
    if (this.time > 60 && app.keyboard.getKeyDown('Z')) {
      this.scene.exit('Title', { skip: 1 })
    }
  }
  get lost () {
    return Math.round(state.save.money / 2) * (state.save.attachment === 1 ? 0 : 1)
  }
  get completedKeyString () {
    return `${state.mission.name}\n\nTime:\nKill:\nMember Death:\nRescue:\n\nReward:`
  }
  get failedKeyString () {
    return `${state.mission.name}\n\nLoss:`
  }
  get completedValueString () {
    return `\n\n${state.score.time}\n${state.score.kill}\n${state.score.death}\n${state.score.rescue}\n\n$${intToString(state.mission.reward)}`
  }
  get failedValueString () {
    return `\n\n$${intToString(this.lost)}`
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
