/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog({ data, open, handleClose }) {
    const classes = useStyles();

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={handleClose}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant='h6'>Results</Typography>
                </Toolbar>
            </AppBar>
            <List>
                {data.length > 0 ? (
                    data.map((row, idx) => (
                        <ListItem key={idx} id={JSON.stringify(row)} button>
                            <ListItemText
                                primary={JSON.stringify(row)}
                                // secondary='Titania'
                            />
                        </ListItem>
                    ))
                ) : (
                    <h1> No Results to Display </h1>
                )}
            </List>
        </Dialog>
    );
}

FullScreenDialog.defaultProps = {
    data: []
};

FullScreenDialog.propTypes = {
    data: PropTypes.array,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};
