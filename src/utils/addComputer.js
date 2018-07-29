import state from '../config/state'
const cos = (rotation, distance) => Math.cos(Math.degToRad(rotation)) * distance
const sin = (rotation, distance) => Math.sin(Math.degToRad(rotation)) * distance
export default (x, y, rotation, type, count) => {
  if (x < 0) x += state.field.width
  if (y < 0) y += state.field.height
  switch (count) {
    case 1:
      Computer().setPosition(x, y).setRotation(rotation).setType(type)
      break
    case 2:
      Computer().setPosition(x + cos(rotation - 90, 50), y + sin(rotation - 90, 50)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 90, 50), y + sin(rotation + 90, 50)).setRotation(rotation).setType(type)
      break
    case 3:
      Computer().setPosition(x, y).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation - 135, 100), y + sin(rotation - 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 135, 100), y + sin(rotation + 135, 100)).setRotation(rotation).setType(type)
      break
    case 4:
      Computer().setPosition(x, y).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation - 135, 100), y + sin(rotation - 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 135, 100), y + sin(rotation + 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 180, 140), y + sin(rotation + 180, 140)).setRotation(rotation).setType(type)
      break
    case 5:
      Computer().setPosition(x, y).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation - 135, 100), y + sin(rotation - 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 135, 100), y + sin(rotation + 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation - 135, 200), y + sin(rotation - 135, 200)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 135, 200), y + sin(rotation + 135, 200)).setRotation(rotation).setType(type)
      break
    case 6:
      Computer().setPosition(x, y).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation - 135, 100), y + sin(rotation - 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 135, 100), y + sin(rotation + 135, 100)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation - 135, 200), y + sin(rotation - 135, 200)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 135, 200), y + sin(rotation + 135, 200)).setRotation(rotation).setType(type)
      Computer().setPosition(x + cos(rotation + 180, 140), y + sin(rotation + 180, 140)).setRotation(rotation).setType(type)
      break
  }
}
