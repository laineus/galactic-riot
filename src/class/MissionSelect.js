import { settings } from '../config/variables'
import state from '../config/state'
import missions from '../mission/missions'
import Cursor from '../utils/Cursor'
export default {
  superClass: 'DisplayElement',
  init (scene, cancel) {
    this.superInit()
    this.list = []
    this.scene = scene
    missions.forEach((mission, i) => {
      this.list.push(MissionSelectItem(mission).addChildTo(this).setPosition(0, i * 38))
    })
    this.setPosition(settings.SCREEN_WIDTH_C - 200, 50)
    this.cursor = new Cursor(this.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, (current) => {
      state.mission = current.mission
      this.scene.exit('Game')
    }, () => {
      cancel()
    })
  },
  update (app) {
    this.cursor.update(app.keyboard)
  }
}
