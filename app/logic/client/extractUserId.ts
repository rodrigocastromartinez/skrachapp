import context from './context'
import { extractSubFromToken } from '../../../com'

export default () => extractSubFromToken(context.token)