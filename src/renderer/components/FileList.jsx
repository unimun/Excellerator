import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from "material-ui/Divider"
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

import path from 'path'

const styles = theme => ({
    root: {
        width: '100%',
        maxHeight: 450,
        height: 450,
        overflow: 'auto',
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: theme.palette.background.paper,
        dense: true,
        disablePadding: true
    },
})

class FileList extends React.Component {
    onDrag = () => {
        console.log("dragged")
    }
    render () {
        const { classes } = this.props
        const { files } = this.props
        const { selected } = this.props
        const { hasDir } = this.props
        const { onClick } = this.props
        const { onDoubleClick } = this.props
        const { onDrag } = this
        const length = files.length
        return (
            <div className={classes.root}>
                <List>
                    {files && files.map((file, index) => (
                        <div key={index}>
                            <ListItem
                                index={index}
                                dense={selected.indexOf(index) !== -1}
                                button
                                onClick={onClick === undefined ? undefined : onClick(index)}
                                onDoubleClick={onDoubleClick === undefined ? undefined : onDoubleClick(index)}
                                onDrag={onDrag}
                            >
                                <ListItemText
                                    primary={path.basename(file)}
                                />
                            </ListItem>
                            {index !== length - 1 ?
                                <Divider light /> :
                                <span/>}
                        </div>
                    ))}
                    </List>
            </div>
        )
    }
}

export default withStyles(styles)(FileList)