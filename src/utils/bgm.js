import { sounds } from '../config/variables'
export default {
  set (name, fade) {
    fade = fade || 200
    if (!name) return SoundManager.stopMusic(fade)
    const sound = phina.asset.AssetManager.get('sound', name)
    if (SoundManager.currentMusic === sound) return
    const setting = sounds[name]
    sound.setLoopStart(setting.loopStart || 0)
    sound.setLoopEnd(setting.loopEnd || sound.buffer.duration)
    SoundManager.playMusic(name, fade, setting.loop)
  }
}
