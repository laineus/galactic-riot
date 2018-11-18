import { settings } from './variables'
export default {
  app: null,
  field: null,
  player: null,
  mission: null,
  interface: null,
  score: {
    frame: 0,
    kill: 0,
    death: 0,
    rescue: 0,
    get sec () {
      return Math.floor(this.frame / settings.FPS)
    },
    get time () {
      return `${Math.floor(this.sec / 60)}:${(this.sec % 60) < 10 ? '0' : ''}${this.sec % 60}`
    },
    amount: 0,
    progress: false
  },
  save: {
    money: 500,
    fighter: 1,
    fighters: [1],
    weapon: 1,
    weapons: [1],
    attachment: 1,
    attachments: [1],
    amount: 5,
    mission: 0,
    sound: true
  }
}
