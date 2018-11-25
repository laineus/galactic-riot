import { settings, colors } from '../config/variables'
import state from '../config/state'
import Radar from './Radar'
import BlurText from './BlurText'
export default class InterfaceScreen extends phina.display.DisplayElement {
  constructor (connection = null) {
    super()
    Object.setPrototypeOf(this, InterfaceScreen.prototype)
    this.connection = connection
    state.interface = this
    this.lightMask = RectangleShape({
      width: settings.SCREEN_WIDTH,
      height: settings.SCREEN_HEIGHT,
      fill: colors.white,
      strokeWidth: 0,
      padding: 0
    }).setOrigin(0, 0).addChildTo(this)
    this.lightMask.alpha = 0
    this.lightMask.blendMode = 'lighter'
    this.initStatus()
    this.initGauge()
    this.initGateNavi()
    this.initAnalyzer()
  }
  initAnalyzer () {
    this.analyzer = DisplayElement().addChildTo(this).setOrigin(0, 0)
    this.analyzer.label = new BlurText('', 12, { shadow: colors.pink }).addChildTo(this.analyzer).setOrigin(0, 1).setPosition(-9, 6)
    this.analyzer.gauge = Gauge({ width: 50, height: 1.5, fill: colors.black, gaugeColor: colors.white, strokeWidth: 0, padding: 0 }).setOrigin(0, 0).addChildTo(this.analyzer)
    this.analyzer.gauge.animationTime = 200
    this.analyzer.update = () => {
      if (state.player.hp > 0 && state.player.target) {
        this.analyzer.alpha = 1
        this.analyzer.x = (state.player.target.x * state.field.camera.zoom * 0.01) + state.field.x + 25
        this.analyzer.y = (state.player.target.y * state.field.camera.zoom * 0.01) + state.field.y + 25
        this.analyzer.label.text = state.player.target.fighter.name
        this.analyzer.gauge.maxValue = state.player.target.maxHp
        this.analyzer.gauge.value = state.player.target.hp
      } else {
        this.analyzer.alpha = 0
      }
    }
  }
  initGateNavi () {
    this.gateNavi = DisplayElement().addChildTo(this)
    this.gateNavi.update = () => {
      state.field.object.children.forEach(obj => {
        if (obj.name === 'Gate' && !obj.nav) {
          obj.nav = this.makeNav(obj)
        }
      })
    }
  }
  makeNav (gate) {
    const margin = 18
    const nav = TriangleShape({
      fill: colors.white,
      strokeWidth: 0,
      radius: 6
    }).addChildTo(this.gateNavi).setScale(1, 3)
    nav.blendMode = 'lighter'
    nav.update = () => {
      if (!gate.parent) return nav.remove()
      const x = (gate.x * state.field.camera.zoom * 0.01) + state.field.x
      const y = (gate.y * state.field.camera.zoom * 0.01) + state.field.y
      nav.rotation = Math.radToDeg(Math.atan2(y - settings.SCREEN_HEIGHT_C, x - settings.SCREEN_WIDTH_C)) + 90
      nav.x = Math.max(Math.min(x, settings.SCREEN_WIDTH - margin), margin)
      nav.y = Math.max(Math.min(y, settings.SCREEN_HEIGHT - margin), margin)
      nav.alpha = (x > 0 && x < settings.SCREEN_WIDTH && y > 0 && y < settings.SCREEN_HEIGHT) ? 0 : 1
    }
    return nav
  }
  initRadar (field, player) {
    if (this.radar) this.radar.remove()
    this.radar = new Radar(field, player).setPosition(20, 20).setOrigin(0, 0).addChildTo(this)
  }
  initStatus () {
    const title = state.mission ? state.mission.name : 'Online field'
    this.status = DisplayElement().setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 25, 25).addChildTo(this)
    this.status.mission = new BlurText(title, 14, { align: 'left' }).setPosition(-140, 5).addChildTo(this.status)
    this.status.keys = new BlurText(null, 13, { align: 'left' }).setPosition(-140, this.connection ? 50 : 43).addChildTo(this.status)
    this.status.values = new BlurText(null, 13, { align: 'right' }).setPosition(0, this.connection ? 50 : 43).addChildTo(this.status)
    if (!this.connection) {
      this.status.keys.text = 'Friends:\nKill:\nTime:'
      this.status.values.update = () => this.status.values.text = `${state.score.amount} / ${state.save.amount}\n${state.score.kill}\n${state.score.time}`
    } else {
      this.status.keys.text = 'Server:\nTeam:\nKill:\nDeath:'
      this.status.values.update = () => this.status.values.text = `${this.connection.server}\n${this.connection.team ? 'West' : 'East'}\n${state.score.kill}\n${state.score.death}`
    }
  }
  initGauge () {
    new BlurText('Energy:', 13).setPosition(13, settings.SCREEN_HEIGHT - 20).setOrigin(0, 1).addChildTo(this)
    this.gauge = this.getGauge().setPosition(20, settings.SCREEN_HEIGHT - 20).setOrigin(0, 1).addChildTo(this)
  }
  getGauge () {
    const gauge = Gauge({
      width: settings.SCREEN_WIDTH - 40,
      height: 1.5,
      cornerRadius: 0,
      maxValue: 100,
      value: 100,
      fill: colors.black,
      gaugeColor: colors.white,
      stroke: colors.blue,
      strokeWidth: 0,
      padding: 0
    })
    gauge.animationTime = 200
    gauge.blendMode = 'lighter'
    gauge.update = () => {
      gauge.maxValue = state.player.maxHp
      gauge.value = state.player.hp
    }
    return gauge
  }
}
