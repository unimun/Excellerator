import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Switch from 'material-ui/Switch'

const styles = theme => ({
    root: {
    },
})

class Settings extends React.Component {
    render() {
        const labels = ["all header", "only struct", "vector"]
        const { classes } = this.props
        const { typeChecked } = this.props
        const { onSelect } = this.props

        return (
            <FormGroup row>
                {labels.map((label, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Switch
                                checked={typeChecked[index]}
                                onChange={onSelect(index)}
                            />
                        }
                        label={label}
                    />
                ))}
            </FormGroup>
        )
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);

