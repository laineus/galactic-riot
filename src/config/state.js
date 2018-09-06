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
    get time () {
      return Math.floor(this.frame / settings.FPS)
    }
  },
  save: {
    money: 0,
    fighter: 1,
    fighters: [1],
    mainWeapon: 1,
    mainWeapons: [1],
    subWeapon: null,
    subWeapons: [],
    amount: 10,
    mission: 0
  }
}
