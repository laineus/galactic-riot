import { colors } from '../config/variables'
import BlurLabel from './BlurLabel'
export default class Text extends BlurLabel {
  constructor (text, size = 15) {
    super({
      text: text ? text : '',
      fontFamily: 'aldrich',
      fontSize: size,
      fill: colors.white
    })
  }
}
