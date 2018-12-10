import { sounds, settings } from './variables'
const assets = {
  image: {
    dummy: '/img/dummy.png',
    credit: '/img/credit.png',
    logo: '/img/logo.png',
    title: '/img/title.png',
    map1_bg: '/img/map1_bg.png',
    map1_fg: '/img/map1_fg.png',
    circle: '/img/circle.png',
    gate: '/img/gate.png',
    gate_blur: '/img/gate_blur.png',
    jet: '/img/jet.png',
    f1_f: '/img/f1_f.png',
    f2_f: '/img/f2_f.png',
    f3_f: '/img/f3_f.png',
    f4_f: '/img/f4_f.png',
    f5_f: '/img/f5_f.png',
    f6_f: '/img/f6_f.png',
    f7_f: '/img/f7_f.png',
    f1_e: '/img/f1_e.png',
    f2_e: '/img/f2_e.png',
    f3_e: '/img/f3_e.png',
    f4_e: '/img/f4_e.png',
    f5_e: '/img/f5_e.png',
    f6_e: '/img/f6_e.png',
    f7_e: '/img/f7_e.png',
    f1_b: '/img/f1_b.png',
    f2_b: '/img/f2_b.png',
    f3_b: '/img/f3_b.png',
    f4_b: '/img/f4_b.png',
    f5_b: '/img/f5_b.png',
    f6_b: '/img/f6_b.png',
    f7_b: '/img/f7_b.png',
    w_assault: '/img/w_assault.png',
    w_gatling: '/img/w_gatling.png',
    w_twin: '/img/w_twin.png',
    w_sniper: '/img/w_sniper.png',
    w_missile: '/img/w_missile.png',
    a_insurance: '/img/a_insurance.png',
    a_armor: '/img/a_armor.png',
    a_tailgun: '/img/a_tailgun.png',
    a_booster: '/img/a_booster.png',
    a_lightbody: '/img/a_lightbody.png',
    laser: '/img/laser.png',
    laser_flash: '/img/laser_flash.png',
    smoke: '/img/smoke.png',
    light: '/img/light.png',
    lock: '/img/lock.png',
    volume: '/img/volume.png'
  },
  font: {
    aldrich: '/font/aldrich.woff'
  },
  sound: Object.assign(
    Object.keys(sounds).reduce((obj, name) => Object.assign(obj, { [name]: `/sound/${name}.ogg` }), {}),
    {
      bomb: '/sound/se_bomb.wav',
      boost: '/sound/se_boost.wav',
      button: '/sound/se_button.wav',
      complete: '/sound/se_complete.wav',
      hit1: '/sound/se_hit1.wav',
      hit2: '/sound/se_hit2.wav',
      laser1: '/sound/se_laser1.wav',
      laser2: '/sound/se_laser2.wav',
      money: '/sound/se_money.wav'
    }
  )
}
Object.keys(assets).forEach(type => {
  Object.keys(assets[type]).forEach(name => {
    assets[type][name] = `.${assets[type][name]}`
  })
})
export default assets
