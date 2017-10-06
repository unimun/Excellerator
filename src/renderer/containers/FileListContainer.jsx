import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as explorerActions from '../modules/explorer'
import FileList from '../components/FileList'
import { ipcRenderer } from 'electron'

class FileListContainer extends Component {
    handleClick = (index) => () => {
        const { selected } = this.props
        const { view } = this.props
        const { ExplorerActions } = this.props
        if (selected.indexOf(index) === -1)
            ExplorerActions.selectFile({
                view: view, 
                index: index})
        else
            ExplorerActions.unselectFile({
                view: view, 
                index: index})
    }

    handleDoubleClick = (index) => () => {
        const fileView = 2
        const { files } = this.props
        const { ExplorerActions } = this.props
        ipcRenderer.send("OPEN_DIR", files[index])
        ExplorerActions.setView(fileView)
    }

    render () {
        const { handleClick } = this
        const { handleDoubleClick } = this
        const { files } = this.props
        const { view } = this.props
        const { selected } = this.props
        const recentView = 0

        return (
            <FileList
                files={files}
                selected={selected}
                onClick={view === recentView ? undefined : handleClick} 
                onDoubleClick={view === recentView ? handleDoubleClick : undefined}/>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        files: state.explorer.get('files').get(ownProps.view).toJS(),
        selected: state.explorer.get('selected').get(ownProps.view).toJS(),
    }),
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch)
    })
)(FileListContainer)