import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { List } from 'immutable'
import { fromJS } from 'immutable'
import path from 'path'
import { ipcRenderer } from 'electron'

const SET_OUT_TYPE = 'converter/SET_OUT_TYPE'
const SET_OUT_PATH = 'converter/SET_OUT_PATH'
const LOAD_DATA = 'converter/LOAD_DATA'

export const setOutType = createAction(SET_OUT_TYPE) // { optionIndex, value }
export const setOutPath = createAction(SET_OUT_PATH) // { path }
export const loadData = createAction(LOAD_DATA) // { typeChecked: []}

const rootDir = path.join(__dirname, '../../..')

const initialState = fromJS({
    typeChecked: [false, false, false],
    path: rootDir
})

export default handleActions({
    [SET_OUT_TYPE]: (state, action) => {
        const { optionIndex, value } = action.payload
        const typeChecked = state.get('typeChecked').toJS()
        typeChecked[optionIndex] = value
        ipcRenderer.send("SEND_SETTINGS", typeChecked)
        return state.set('typeChecked', fromJS(typeChecked) )
    },
    [SET_OUT_PATH]: (state, action) => state.set('path', action.payload),
    [LOAD_DATA]: (state, action) => {
        const { typeChecked } = action.payload
        return state.set('typeChecked', fromJS(typeChecked))
    },
}, initialState)