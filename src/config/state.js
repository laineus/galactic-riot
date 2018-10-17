import { settings } from "./variables";
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
    amount: 0
  },
  save: {
    money: 0,
    fighter: 1,
    fighters: [1],
    mainWeapon: 1,
    mainWeapons: [1],
    subWeapon: null,
    subWeapons: [],
    amount: 5,
    mission: 0
  }
}
