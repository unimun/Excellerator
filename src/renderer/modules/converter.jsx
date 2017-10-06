import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { List } from 'immutable'
import { fromJS } from 'immutable'
import path from 'path'

const SET_OUT_TYPE = 'converter/SET_OUT_TYPE'
const SET_OUT_PATH = 'converter/SET_OUT_PATH'

export const setOutType = createAction(SET_OUT_TYPE) // { optionIndex, value }
export const setOutPath = createAction(SET_OUT_PATH) // { path }

const rootDir = path.join(__dirname, '../../..')

const initialState = fromJS({
    typeChecked: [false, true, false],
    path: rootDir
})

export default handleActions({
    [SET_OUT_TYPE]: (state, action) => {
        const { optionIndex, value } = action.payload
        return state.setIn(['typeChecked', optionIndex], value)
    },
    [SET_OUT_PATH]: (state, action) => state.set('path', action.payload),
}, initialState)