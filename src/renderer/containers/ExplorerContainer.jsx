import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as explorerActions from '../modules/explorer'
import Explorer from '../components/Explorer'

import { ipcRenderer } from 'electron'

class ExplorerContainer extends Component {
    handleChange = (_e, view) => {
        const { ExplorerActions } = this.props
        const excelView = 1
        if (view === excelView)
            ipcRenderer.send("EXCEL_LIST")
        ExplorerActions.setView(view)
    }

    render () {
        const { view } = this.props
        const { handleChange } = this

        return (
            <Explorer value={view} onChange={handleChange}/>
        )
    }
}

export default connect(
    (state) => ({
        view: state.explorer.get('view')
    }),
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch)
    })
)(ExplorerContainer)