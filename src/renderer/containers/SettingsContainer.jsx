import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as converterActions from '../modules/converter'

import Settings from '../components/Settings'

class SettingsContainer extends Component {
    handleSelectControl = (optionIndex) => (_e, value) => {
        const { ConverterActions } = this.props
        ConverterActions.setOutType({optionIndex: optionIndex, value: value})
    }
    render () {
        const { handleSelectControl } = this
        const { typeChecked } = this.props

        return (
            <Settings typeChecked={typeChecked} onSelect={handleSelectControl}/>
        )
    }
}

export default connect(
    (state) => ({
        typeChecked: state.converter.get('typeChecked').toJS()
    }),
    (dispatch) => ({
        ConverterActions: bindActionCreators(converterActions, dispatch),
    }),
)(SettingsContainer)