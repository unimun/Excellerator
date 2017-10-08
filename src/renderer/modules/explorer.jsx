import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { List } from 'immutable'
import { fromJS } from 'immutable'
import { ipcRenderer } from 'electron'

const SET_VIEW = 'explorer/SET_VIEW'
const ADD_DIR = 'explorer/ADD_DIR'
const SET_FILES = 'explorer/SET_FILES'
const SELECT_FILE = 'explorer/SELECT_FILE'
const UNSELECT_FILE = 'explorer/UNSELECT_FILE'
const STAGE = 'explorer/STAGE'
const UNSTAGE = 'explorer/UNSTAGE'
const LOAD_DATA = 'explorer/LOAD_DATA'

export const setView = createAction(SET_VIEW) // { view }
export const addDir = createAction(ADD_DIR) // { directoryPath }
export const setFiles = createAction(SET_FILES) // { view, [ files ] ] }
export const selectFile = createAction(SELECT_FILE) // { view, index }
export const unselectFile = createAction(UNSELECT_FILE) // { view, index }
export const stage = createAction(STAGE) // {}
export const unstage = createAction(UNSTAGE) // {}
export const loadData = createAction(LOAD_DATA) // { {files}, {checkedType}}

const initialState = Map({
    view: 0,
    files: List([List([]), List([]), List([]), List([])]),
    selected: List([List([]), List([]), List([]), List([])])
})

const sendFile = (view, files) => {
    ipcRenderer.send("SEND_FILE", view, files)
}

export default handleActions({
    [SET_VIEW]: (state, action) => state.set('view', action.payload),
    [ADD_DIR]: (state, action) => {
        const recentView = 0
        const maxDir = 20
        let recentDirs = state.getIn(['files', recentView]).toJS()
        recentDirs.push(action.payload)
        if (recentDirs.length > maxDir) recentDirs.splice(0, 1)
        sendFile(recentView, recentDirs)
        return state.setIn(['files', recentView], fromJS(recentDirs))
    },
    [SET_FILES]: (state, action) => {
        const { view, files } = action.payload
        sendFile(view, files)
        return state.setIn(['files', view], fromJS(files))
    },
    [SELECT_FILE]: (state, action) => {
        const { view, index } = action.payload
        const selected = state.get('selected').get(view)
        return state.setIn(['selected', view], selected.push(index))
    },
    [UNSELECT_FILE]: (state, action) => {
        const { view, index } = action.payload
        const selected = state.get('selected').get(view)
        const pos = selected.findIndex(selectedIndex => selectedIndex === index)
        // console.log(pos, selected.toJS(), index)
        return state.setIn(['selected', view], selected.delete(pos))
    },
    [STAGE]: (state, action) => {
        const files = state.get('files').toJS()
        const selected = state.get('selected').toJS()
        const stageView = 3
        files.forEach((filesOfView, viewIndex, files) => {
            if (viewIndex === stageView) return
            filesOfView.forEach((file, fileIndex) => {
                const selectedIndex = selected[viewIndex].indexOf(fileIndex)
                if (selectedIndex !== -1) {
                    files[stageView].push(files[viewIndex][fileIndex])
                    selected[viewIndex].splice(selectedIndex, 1)
                }
            })
        })

        const stageSet = new Set(files[stageView])
        files[stageView] = [...stageSet]

        sendFile(stageView, files[stageView])
        return state.set('files', fromJS(files))
            .set('selected', fromJS(selected))
    },
    [UNSTAGE]: (state, action) => {
        const files = state.get('files').toJS()
        const selected = state.get('selected').toJS()
        const stageView = 3
        files[stageView] = files[stageView].filter((file, index) => {
            return selected[stageView].indexOf(index) === -1
        })

        selected[stageView] = []

        sendFile(stageView, files[stageView])
        return state.set('files', fromJS(files))
            .set('selected', fromJS(selected))
    },
    [LOAD_DATA]: (state, action) => {
        const { files } = action.payload
        return state.set('files', fromJS(files))
    },
    }, initialState)