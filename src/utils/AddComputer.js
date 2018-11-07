import state from '../config/state'
import Player from '../class/Player'
import Computer from '../class/Computer'
export default class AddComputer {
  constructor (x, y, r, type, fighterId, count) {
    if (x < 0) x += state.field.width
    if (y < 0) y += state.field.height
    this.x = x !== null ? x : Math.randint(0, state.field.width)
    this.y = y !== null ? y : Math.randint(0, state.field.height)
    this.r = r !== null ? r : Math.radToDeg(Math.atan2(state.player.y - y, state.player.x - x))
    this.type = type
    this.subType = type === 'player' ? 'friend' : type
    this.fighterId = fighterId || (type === 'player' ? state.save.fighter : state.save.fighters.random())
    this.hash = Math.randint(1000000, 9999999)
    this.leader = null
    this.add(count)
  }
  add (count) {
    switch (count) {
      case 1:
        this.getFighter(0, 0, true)
        break
      case 2:
        this.getFighter(-90, 50, true)
        this.getFighter(90, 50, false)
        break
      case 3:
        this.getFighter(0, 0, true)
        this.getFighter(-135, 100, false)
        this.getFighter(135, 100, false)
        break
      case 4:
        this.getFighter(0, 0, true)
        this.getFighter(-135, 100, false)
        this.getFighter(135, 100, false)
        this.getFighter(180, 140, false)
        break
      case 5:
        this.getFighter(0, 0, true)
        this.getFighter(-135, 100, false)
        this.getFighter(135, 100, false)
        this.getFighter(-135, 200, false)
        this.getFighter(135, 200, false)
        break
      case 6:
        this.getFighter(0, 0, true)
        this.getFighter(-135, 100, false)
        this.getFighter(135, 100, false)
        this.getFighter(-135, 200, false)
        this.getFighter(135, 200, false)
        this.getFighter(180, 140, false)
        break
    }
  }
  cos (rotation, distance) {
    return distance === 0 ? 0 : Math.cos(Math.degToRad(rotation)) * distance
  }
  sin (rotation, distance) {
    return distance === 0 ? 0 : Math.sin(Math.degToRad(rotation)) * distance
  }
  getFighter (rotation, distance, leader) {
    const x = this.x + this.cos(this.r - rotation, distance)
    const y = this.y + this.sin(this.r - rotation, distance)
    const type = leader ? this.type : this.subType
    if (type === 'friend') state.score.amount--
    const obj = (type === 'player') ? new Player() : new Computer().setType(type).setFighter(this.fighterId)
    obj.hash = this.hash
    obj.setPosition(x, y).setRotation(this.r)
    if (leader) {
      obj.x += this.cos(obj.rotation, 70)
      obj.y += this.sin(obj.rotation, 70)
      this.leader = obj
      if (type === 'friend') obj.setSubTarget(state.player)
    } else if (this.leader) {
      obj.setSubTarget(this.leader, rotation, distance)
    }
    return obj
  }
}
