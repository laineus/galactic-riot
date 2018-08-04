import missions from '../mission/missions'
import settings from '../config/settings'
import Cursor from '../utils/Cursor'
export default {
  superClass: 'DisplayElement',
  list: [],
  init () {
    this.superInit()
    missions.forEach((mission, i) => {
      this.list.push(MissionSelectItem(mission).addChildTo(this).setPosition(0, i * 50))
    })
    this.setPosition(settings.SCREEN_WIDTH_C - 200, 40)
    this.cursor = new Cursor(this.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, (current) => {
    }, () => {
    })
  },
  update (app) {
    this.cursor.update(app.keyboard)
  }
}
