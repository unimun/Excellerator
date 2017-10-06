import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import ArrowForwardIcon from 'material-ui-icons/ArrowForward'

const styles = theme => ({
    root: {
        height: '100%'
    },
    button: {
        width: '100%'
    }
})

class StageButton extends React.Component {
    render() {
        const { classes } = this.props
        const { onClickStage } = this.props
        const { onClickUnstage } = this.props

        return (
            <Grid container className={classes.root}
                align={'stretch'}
                justify={'center'}
                direction={'column'}>
                <Grid item>
                    <Button
                        raised
                        className={classes.button}
                        onClick={onClickStage}>
                        <ArrowForwardIcon/>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        raised
                        className={classes.button}
                        onClick={onClickUnstage}>
                        <ArrowBackIcon/>
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

StageButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StageButton);