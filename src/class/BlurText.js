import { colors } from '../config/variables'
import BlurLabel from './BlurLabel'
export default class BlurText extends BlurLabel {
  constructor (text, size = 15, options = {}) {
    super(Object.assign({
      text: text ? text : '',
      fontFamily: 'aldrich',
      fontSize: size,
      fill: colors.white,
    }, options))
  }
}
