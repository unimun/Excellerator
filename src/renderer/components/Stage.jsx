import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import FileListContainer from '../containers/FileListContainer'
import SettingsContainer from '../containers/SettingsContainer'

const styles = theme => ({
    root: {
        padding: '16pt'
    },
    button: {
        width: '100%'
    }
})

class Stage extends React.Component {
    render() {
        const { classes } = this.props
        const stageView = 3
        const { onClick } = this.props

        return (
            <Grid container 
                className={classes.root}
                spacing={0}
                align={'stretch'}
                justify={'flex-start'}
                direction={'column'}>
                <Grid item><SettingsContainer/></Grid>
                <Grid item><Divider/></Grid>
                <Grid item>
                    <FileListContainer view={stageView} />
                </Grid>
                <Grid item>
                    <Button 
                        color={'primary'}
                        raised 
                        className={classes.button}
                        onClick={onClick}>convert!</Button>
                </Grid>
            </Grid>
        )
    }
}

Stage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stage);
