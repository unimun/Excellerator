import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as explorerActions from '../modules/explorer'
import StageButton from '../components/StageButton'

class StageButtonContainer extends Component {
    handleStage = () => {
        const { ExplorerActions } = this.props
        ExplorerActions.stage()
    }

    handleUnstage = () => {
        const { ExplorerActions } = this.props
        ExplorerActions.unstage()
    }

    render () {
        const { view } = this.props
        const { handleStage } = this
        const { handleUnstage } = this

        return (
            <StageButton
                onClickStage={handleStage}
                onClickUnstage={handleUnstage} />
        )
    }
}

export default connect(
    undefined,
    (dispatch) => ({
        ExplorerActions: bindActionCreators(explorerActions, dispatch)
    })
)(StageButtonContainer)