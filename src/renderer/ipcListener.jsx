import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as converterActions from './modules/converter'
import * as explorerActions from './modules/explorer'
import { ipcRenderer } from 'electron'

class IpcListener extends React.Component {
    render () {
        return (
            <div/>
        )
    }
    componentDidMount() {
        ipcRenderer.on("SEND_FILES", (_e, view, files) => {
            const { ExplorerActions } = this.props
            ExplorerActions.setFiles({ view: view, files: files })
            ExplorerActions.setView(view)
        })

        ipcRenderer.on("SEND_DIR", (_e, directoryPath) => {
            const { ExplorerActions } = this.props
            ExplorerActions.addDir(directoryPath)
        })

        ipcRenderer.on("SEND_OK", (_e) => {
            console.log('got ok')
        })

        ipcRenderer.on("LOAD_DATA", (_e, data) => {
            const { ExplorerActions } = this.props
            const { ConverterActions } = this.props
            if ('files' in data)
                ExplorerActions.loadData(data)
            if ('typeChecked' in data)
                ConverterActions.loadData(data)
        })

        ipcRenderer.send("REQUEST_DATA")
    }
}

export default connect(
    (state) => ({
        files: state.explorer.get('files').toJS()
    }),
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch),
        ConverterActions: bindActionCreators(converterActions, dispatch),
    }),
)(IpcListener)
