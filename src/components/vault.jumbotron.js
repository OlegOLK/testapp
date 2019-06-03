import React from 'reactn';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    text: {
        fontSize: '2.5em',
        color: 'white'
    },
    icon: {
        fontSize: '1em'
    },
    container: {
        textAlign: "center",
        height: "50px",
        width: "auto",
        backgroundColor: "#3f51b5",
        paddingTop: '0.8em',
        paddingBottom: '0.8em'        

    }
})

function VaultJumbotron(props) {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <Typography className={classes.text}>
                Creation of new rule    
            </Typography>
        </div>
    )
}

VaultJumbotron.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VaultJumbotron);