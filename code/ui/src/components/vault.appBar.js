import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { VaultRoutes } from '../route';
import { getConfig } from 'radiks';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function VaultAppBar(props) {

  function loadUserData() {
    const data = props.userSession.loadUserData();
    return data.username;
  }

  const { userSession } = getConfig();


  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Button href={VaultRoutes.createRule.path} disabled={!userSession.isUserSignedIn()} className={classes.button}>
              Create rule
          </Button>
          <Button href={VaultRoutes.serverMode.path} disabled={!userSession.isUserSignedIn()}>Server mode</Button>
          <Button>Support</Button>
          
          {
              !props.userSession.isUserSignedIn() ?
              <Button onClick={props.handleSignIn}>
                Login with blockstack
              </Button>
                :
              <Button onClick={props.handleSignOut}> {loadUserData()}</Button>
                
          }
          {/* <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            View my rules
          </Typography> */}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

VaultAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VaultAppBar);