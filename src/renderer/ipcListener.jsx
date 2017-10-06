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
            // <button >dfj</button>
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
    }
}

export default connect(
    undefined,
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch),
        // ConverterActions: bindActionCreators(converterActions, dispatch),
    }),
)(IpcListener)
