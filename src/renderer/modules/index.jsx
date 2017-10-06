import { combineReducers } from 'redux'

import explorer from './explorer'
import converter from './converter'

export default combineReducers({
    explorer,
    converter
})