import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as explorerActions from '../modules/explorer'
import NameList from '../components/NameList'
import { ipcRenderer } from 'electron'

class NameListContainer extends Component {

}

export default connect(
    (state, ownProps) => ({

        files: state.explorer.get('files').get(ownProps.view).toJS(),
        selected: state.explorer.get('selected').get(ownProps.view).toJS(),
    }),
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch)
    })
)(NameListContainer)