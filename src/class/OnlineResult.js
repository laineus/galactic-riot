import state from '../config/state'
import bgm from '../utils/bgm'
import Result from './Result'
export default class OnlineResult extends Result {
  constructor (completed, result) {
    super(completed)
    Object.setPrototypeOf(this, OnlineResult.prototype)
    state.score.progress = false
    setTimeout(() => SoundManager.play('complete'), 200)
    bgm.set(null, 1000)
    setTimeout(() => bgm.set(completed ? 'victory' : 'lose', 50), 1000)
    this.time = 0
    this.setTitle(`- ${completed ? 'Victory' : 'Defeat'} -`)
    this.setKey('Online field\n\nResult:\nKill:\nDeath:')
    this.setValue(`\n\n${result.eastKill}-${result.eastKill}\n${state.score.kill}\n${state.score.death}`)
  }
  update (app) {
    this.time++
    if (this.time > 60 && app.keyboard.getKeyDown('Z')) {
      SoundManager.play('button')
      this.scene.exit('Title', { skip: 2 })
    }
  }
}
