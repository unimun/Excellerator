import React from "react";
import { ipcRenderer } from "electron";
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

import ExplorerContainer from './containers/ExplorerContainer'
import StageButtonContainer from './containers/StageButtonContainer'
import StageContainer from './containers/StageContainer'

import IpcListener from './ipcListener'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class App extends React.Component {
    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <IpcListener/>
                <Grid container spacing={24}>
                    <Grid item sm={6}><ExplorerContainer/></Grid>
                    <Grid item sm={1}><StageButtonContainer/></Grid>
                    <Grid item sm={5}><StageContainer/></Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(App);