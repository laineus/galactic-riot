export const settings = {
  GAME_TITLE: 'GALACTIC RIOT',
  DOM_ID: 'game',
  SCREEN_WIDTH: 960,
  SCREEN_HEIGHT: 540,
  get SCREEN_WIDTH_C () { return this.SCREEN_WIDTH / 2 },
  get SCREEN_HEIGHT_C () { return this.SCREEN_HEIGHT / 2 },
  FPS: 30
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
  pink: '#fc027d'
}

export const fields = {
  sublatant_1: {
    width: 6000,
    height: 4000
  },
  sublatant_2: {
    width: 3000,
    height: 3000
  }
}

export const fighters = [
  {
    id: 1,
    name: 'f1',
    price: 1000,
    img: 'f1_f',
    img2: 'f1_e',
    speed: 7,
    mobility: 3
  },
  {
    id: 2,
    name: 'f2',
    price: 1000,
    img: 'f2_f',
    img2: 'f2_e',
    speed: 7,
    mobility: 3
  },
  {
    id: 3,
    name: 'f3',
    price: 1000,
    img: 'f3_f',
    img2: 'f3_e',
    speed: 7,
    mobility: 3
  },
  {
    id: 4,
    name: 'f4',
    price: 1000,
    img: 'f4_f',
    img2: 'f4_e',
    speed: 7,
    mobility: 3
  },
  {
    id: 5,
    name: 'f5',
    price: 1000,
    img: 'f5_f',
    img2: 'f5_e',
    speed: 7,
    mobility: 3
  },
  {
    id: 6,
    name: 'f6',
    price: 1000,
    img: 'f6_f',
    img2: 'f6_e',
    speed: 7,
    mobility: 3
  }
]
export const fighterFind = id => fighters.find(v => v.id === id)

export const mainWeapons = [
  {
    id: 1,
    name: 'Assult',
    price: 1000,
    img: 'w_assult',
    damage: 35,
    delay: 5,
    speed: 50,
    isHoming: false,
    twinDiff: false
  },
  {
    id: 2,
    name: 'Gatling',
    price: 1000,
    img: 'w_gatling',
    damage: 15,
    delay: 3,
    speed: 50,
    isHoming: false,
    twinDiff: 15 },
  {
    id: 3,
    name: 'Twin',
    price: 1000,
    img: 'w_twin',
    damage: 10,
    delay: 7,
    speed: 50,
    isHoming: false,
    twinDiff: 25
  },
  {
    id: 4,
    name: 'Sniper',
    price: 1000,
    img: 'w_sniper',
    damage: 60,
    delay: 10,
    speed: 50,
    isHoming: false,
    twinDiff: false
  }
]
export const mainWeaponFind = id => mainWeapons.find(v => v.id === id)

export const subWeapons = [
  {
    id: 1,
    name: 'Booster',
    price: 1000,
    img: 'w_boost',
    damage: null,
    delay: 20,
    speed: null,
    isHoming: false,
    twinDiff: false
  },
  {
    id: 2,
    name: 'Tailgun',
    price: 1000,
    img: 'w_tailgun',
    damage: 20,
    delay: 5,
    speed: 50,
    isHoming: false,
    twinDiff: false
  }
]
export const subWeaponFind = id => subWeapons.find(v => v.id === id)
