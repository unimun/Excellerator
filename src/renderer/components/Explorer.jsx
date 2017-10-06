import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

import FileListContainer from '../containers/FileListContainer'

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: '100%'
    },
    tabs: {
        'min-width': '0px'
    }
})

class Explorer extends React.Component {
    render () {
        const tabNames = ["Recent", "Excel", "Files"]
        const { classes } = this.props
        const { value } = this.props
        const { onChange } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        className={classes.tabs}
                        value={value}
                        onChange={onChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        {tabNames.map((name, index) => {
                            return (<Tab label={name} key={index}/>)
                        })}
                    </Tabs>
                </AppBar>
                <SwipeableViews index={value} onChangeIndex={onChange}>
                    {tabNames.map((name, index) => {
                        return (
                            <FileListContainer 
                                view={index} 
                                key={index}
                            />
                        )
                    })}
                </SwipeableViews>
            </div>
        )
    }
}

export default withStyles(styles)(Explorer)