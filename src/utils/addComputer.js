import state from '../config/state'
import Player from '../class/Player'
import Computer from '../class/Computer'
const cos = (rotation, distance) => Math.cos(Math.degToRad(rotation)) * distance
const sin = (rotation, distance) => Math.sin(Math.degToRad(rotation)) * distance
const initElement = (x, y, r, type, hash) => {
  const obj = (type === 'player') ? new Player() : new Computer().setType(type)
  obj.setPosition(x, y).setRotation(r)
  obj.hash = hash
  obj.subTarget = state.player
  return obj
}
const move = obj => {
  obj.x += cos(obj.rotation, 70)
  obj.y += sin(obj.rotation, 70)
}
export default (x, y, r, type, count) => {
  if (type === 'friend') state.score.amount -= count
  const subType = type === 'player' ? 'friend' : type
  if (x === null) x = Math.randint(0, state.field.width)
  if (y === null) y = Math.randint(0, state.field.height)
  if (r === null) r = Math.radToDeg(Math.atan2(state.player.y - y, state.player.x - x))
  if (x < 0) x += state.field.width
  if (y < 0) y += state.field.height
  const hash = Math.randint(1000000, 9999999)
  switch (count) {
    case 1:
      initElement(x, y, r, type, hash)
      break
    case 2:
      const leader2 = initElement(x + cos(r - 90, 50), y + sin(r - 90, 50), r, type, hash)
      move(leader2)
      initElement(x + cos(r + 90, 50), y + sin(r + 90, 50), r, subType, hash).setSubTarget(leader2, 90, 50)
      break
    case 3:
      const leader3 = initElement(x, y, r, type, hash)
      move(leader3)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash).setSubTarget(leader3, -135, 100)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash).setSubTarget(leader3, 135, 100)
      break
    case 4:
      const leader4 = initElement(x, y, r, type, hash)
      move(leader4)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash).setSubTarget(leader4, -135, 100)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash).setSubTarget(leader4, 135, 100)
      initElement(x + cos(r + 180, 140), y + sin(r + 180, 140), r, subType, hash).setSubTarget(leader4, 180, 140)
      break
    case 5:
      const leader5 = initElement(x, y, r, type, hash)
      move(leader5)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash).setSubTarget(leader5, -135, 100)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash).setSubTarget(leader5, 135, 100)
      initElement(x + cos(r - 135, 200), y + sin(r - 135, 200), r, subType, hash).setSubTarget(leader5, -135, 200)
      initElement(x + cos(r + 135, 200), y + sin(r + 135, 200), r, subType, hash).setSubTarget(leader5, 135, 200)
      break
    case 6:
      const leader6 = initElement(x, y, r, type, hash)
      move(leader6)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash).setSubTarget(leader6, -135, 100)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash).setSubTarget(leader6, 135, 100)
      initElement(x + cos(r - 135, 200), y + sin(r - 135, 200), r, subType, hash).setSubTarget(leader6, -135, 200)
      initElement(x + cos(r + 135, 200), y + sin(r + 135, 200), r, subType, hash).setSubTarget(leader6, 135, 200)
      initElement(x + cos(r + 180, 140), y + sin(r + 180, 140), r, subType, hash).setSubTarget(leader6, 180, 140)
      break
  }
}
