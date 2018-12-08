import state from '../config/state'
import saveData from '../utils/saveData'
import intToString from '../utils/intToString'
import bgm from '../utils/bgm'
import Result from './Result'
export default class MissionResult extends Result {
  constructor (scene, completed) {
    super(completed)
    Object.setPrototypeOf(this, MissionResult.prototype)
    if (completed) {
      state.save.mission = Math.max(state.mission.index, state.save.mission)
      state.save.money += state.mission.reward
      saveData.save()
    } else {
      state.save.money = Math.max(state.save.money - this.lost, 0)
      saveData.save()
    }
    state.score.progress = false
    setTimeout(() => SoundManager.play('complete'), 200)
    bgm.set(null, 1000)
    setTimeout(() => bgm.set(completed ? 'victory' : 'lose', 50), 1000)
    this.scene = scene
    this.time = 0
    this.setTitle(`- Mission ${completed ? 'Completed' : 'Failed'} -`)
    this.setKey(completed ? this.completedKeyString : this.failedKeyString)
    this.setValue(completed ? this.completedValueString : this.failedValueString)
    gtag('event', 'finish', { 'event_category': 'mission', 'event_label': state.mission.name, 'value': completed ? 1 : 0 })
  }
  update (app) {
    this.time++
    if (this.time > 60 && app.keyboard.getKeyDown('Z')) {
      SoundManager.play('button')
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
