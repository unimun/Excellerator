import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as explorerActions from '../modules/explorer'
import { ipcRenderer } from 'electron'

import Stage from '../components/Stage'
import toJS from 'immutable'

class StageContainer extends Component {
    handleButtonClick = () => {
        // console.log('hello')
        const { files } = this.props
        console.log(files)
        ipcRenderer.send("WRITE_STAGED_FILES", files)
    }

    render () {
        const { handleButtonClick } = this

        return (
            <Stage onClick={handleButtonClick}/>
        )
    }
}

const stageView = 3
export default connect(
    (state) => ({
        files: state.explorer.getIn(['files', stageView]).toJS()
    }),
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch)
    })
)(StageContainer)