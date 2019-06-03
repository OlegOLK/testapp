import React from 'reactn';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#3f51b5",
  },
  container:{
    bottom: "0",
    position: 'fixed',
    width: '100%',
    textAlign: 'center',
    backgroundColor: "#3f51b5",
  }
});

function VaultBreadcrumbs(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  );
}

VaultBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VaultBreadcrumbs);
