const CLIENT_SERVER = process.env.CLIENT_SERVER || 'https://galactic.laineus.com'
const WS_SERVER = process.env.WS_SERVER || 'wss://galactic.laineus.com/ws'
const HTTP_SERVER = process.env.HTTP_SERVER || 'https://galactic.laineus.com'
export const settings = {
  GAME_TITLE: 'GALACTIC RIOT',
  DOM_ID: 'game',
  SCREEN_WIDTH: 960,
  SCREEN_HEIGHT: 540,
  get SCREEN_WIDTH_C () { return this.SCREEN_WIDTH / 2 },
  get SCREEN_HEIGHT_C () { return this.SCREEN_HEIGHT / 2 },
  FPS: 30,
  CLIENT_SERVER,
  WS_SERVER,
  HTTP_SERVER,
  SERVICE_WORKER_SCRIPT: './serviceWorker.js'
}

export const colors = {
  black: '#000',
  black_05: 'rgba(0, 0, 0, 0.5)',
  white: '#FFF',
  white_05: 'rgba(255, 255, 255, 0.5)',
  gray: 'rgb(127, 127, 127)',
  gray_05: 'rgba(127, 127, 127, 0.5)',
  dark: 'rgb(64, 64, 64)',
  dark_05: 'rgba(64, 64, 64, 0.5)',
  dark_07: 'rgba(64, 64, 64, 0.7)',
  blue: '#0cfcfc',
  green: '#53f623',
  pink: '#fc027d',
  yellow: '#ED3'
}

export const fields = {
  sublatant_1: {
    width: 6000,
    height: 4000
  },
  sublatant_2: {
    width: 3000,
    height: 3000
  },
  sublatant_3: {
    width: 3000,
    height: 6000
  },
  sublatant_4: {
    width: 7000,
    height: 3000
  },
  sublatant_5: {
    width: 7000,
    height: 4000
  },
  sublatant_6: {
    width: 4000,
    height: 7000
  }
}

export const fighters = [
  {
    id: 1,
    name: 'Dagger',
    price: 600,
    img: 'f1_f',
    img2: 'f1_e',
    img3: 'f1_b',
    energy: 300,
    speed: 7,
    mobility: 3
  },
  {
    id: 2,
    name: 'Berkut',
    price: 1000,
    img: 'f2_f',
    img2: 'f2_e',
    img3: 'f2_b',
    energy: 500,
    speed: 8,
    mobility: 4
  },
  {
    id: 3,
    name: 'Lightning',
    price: 2200,
    img: 'f3_f',
    img2: 'f3_e',
    img3: 'f3_b',
    energy: 400,
    speed: 16,
    mobility: 4
  },
  {
    id: 4,
    name: 'Stingray',
    price: 4000,
    img: 'f4_f',
    img2: 'f4_e',
    img3: 'f4_b',
    energy: 1600,
    speed: 6,
    mobility: 3
  },
  {
    id: 5,
    name: 'Raven',
    price: 7000,
    img: 'f5_f',
    img2: 'f5_e',
    img3: 'f5_b',
    energy: 800,
    speed: 9,
    mobility: 5
  },
  {
    id: 6,
    name: 'Spectre',
    price: 10000,
    img: 'f6_f',
    img2: 'f6_e',
    img3: 'f6_b',
    energy: 900,
    speed: 12,
    mobility: 6
  },
  {
    id: 7,
    name: 'Marshal',
    price: 12000,
    img: 'f7_f',
    img2: 'f7_e',
    img3: 'f7_b',
    energy: 1200,
    speed: 13,
    mobility: 5
  }
]
export const fighterFind = id => fighters.find(v => v.id === id)

export const weapons = [
  {
    id: 1,
    name: 'Assault',
    price: 300,
    img: 'w_assault',
    damage: 35,
    delay: 5,
    speed: 50,
    isHoming: false,
    twinDiff: false,
    desc: 'The general laser',
    desc_ja: '最も一般的なレーザー',
  },
  {
    id: 2,
    name: 'Twin',
    price: 1000,
    img: 'w_twin',
    damage: 20,
    delay: 7,
    speed: 50,
    isHoming: false,
    twinDiff: 35,
    desc: 'The twin laser',
    desc_ja: '2基のレーザー'
  },
  {
    id: 3,
    name: 'Gatling',
    price: 2000,
    img: 'w_gatling',
    damage: 25,
    delay: 3,
    speed: 50,
    isHoming: false,
    twinDiff: 35,
    desc: 'The rapid-fire laser',
    desc_ja: '連射力に優れるレーザー'
  },
  {
    id: 4,
    name: 'Sniper',
    price: 2000,
    img: 'w_sniper',
    damage: 70,
    delay: 10,
    speed: 50,
    isHoming: false,
    twinDiff: false,
    desc: 'The powerful laser',
    desc_ja: '高威力なレーザー'
  },
  {
    id: 5,
    name: 'Homing',
    price: 5000,
    img: 'w_missile',
    damage: 20,
    delay: 5,
    speed: 50,
    isHoming: true,
    twinDiff: false,
    desc: 'The homing laser',
    desc_ja: '追尾性のあるレーザー'
  }
]
export const weaponFind = id => weapons.find(v => v.id === id)

export const attachments = [
  {
    id: 1,
    name: 'Insurance',
    price: 100,
    img: 'a_insurance',
    desc: 'Compensate for loss of mission failure',
    desc_ja: 'ミッション失敗時の損失を補償'
  },
  {
    id: 2,
    name: 'Armor',
    price: 1000,
    img: 'a_armor',
    desc: 'Reduce laser damage',
    desc_ja: 'ダメージを軽減'
  },
  {
    id: 3,
    name: 'Tailgun',
    price: 500,
    img: 'a_tailgun',
    damage: 20,
    delay: 5,
    speed: 50,
    isHoming: false,
    twinDiff: false,
    desc: 'Shoot laser behind',
    desc_ja: '後方への射撃'
  },
  {
    id: 4,
    name: 'E-Booster',
    price: 2000,
    img: 'a_booster',
    desc: 'Reduce energy consumption of boost',
    desc_ja: 'ブースト時のエネルギー消費を軽減'
  },
  {
    id: 5,
    name: 'LightBody',
    price: 3000,
    img: 'a_lightbody',
    desc: 'Improve mobility',
    desc_ja: '速度と機動性を向上'
  }
]
export const attachmentFind = id => attachments.find(v => v.id === id)

export const sounds = {
  title: { loop: true, loopStart: 24 },
  battle: { loop: true, loopStart: 0 },
  army: { loop: true, loopStart: 16 },
  riot: { loop: true, loopStart: 0.103 },
  victory: { loop: false, loopStart: 0 },
  lose: { loop: false, loopStart: 0 }
}
