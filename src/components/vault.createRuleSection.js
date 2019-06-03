import React from 'reactn';
import { Grid, Typography, Link, Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { VaultRoutes } from '../route';
import ConditionIndex from './cards/conditions/index';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActionIndex from './cards/actions/index';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    text: {
        fontSize: '1em'
    },
    icon: {
        fontSize: '1em'
    },
    margin: {
        padding: theme.spacing(0, 2),
        //margin: theme.spacing(-5),
    },
    container: {
        flexGrow: 1,
        // textAlign: "center"
    },
    card: {
        // minWidth: 275,
        minHeight: 300,
        maxWidth: 300,
        textAlign: "center",
        margin: 10,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(1),
    },
}));



function VaultCreateRuleSection(props) {
    const classes = useStyles();

    function drawCreatRule() {
        return (
            <Grid container spacing={2} justify="center" className={classes.container}>
                <Grid item xs={12} md={3} >
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="CREATE NEW RULE"
                        />

                        <Link className={classes.text} component={RouterLink} to={VaultRoutes.createRule.child.createConditions.path}>
                            <Fab
                                variant="extended"
                                size="small"
                                color="primary"
                                aria-label="Add"
                                className={classes.fab}
                            >
                                <AddIcon className={classes.extendedIcon} />
                                <Badge color="secondary" badgeContent={global.newRule.conditions.length} className={classes.margin}>
                                    Add conditions
                                </Badge>
                            </Fab>
                        </Link>

                        <Link className={classes.text} component={RouterLink} to={VaultRoutes.createRule.child.createActions.path}>
                            <Fab
                                className={classes.fab}
                                variant="extended"
                                size="small"
                                color="primary"
                                aria-label="Add"
                            >
                                <AddIcon className={classes.extendedIcon} />
                                <Badge color="secondary" badgeContent={global.newRule.actions.length} className={classes.margin}>
                                    Add actions
                            </Badge>
                            </Fab>
                        </Link>
                            <br/>

                        <Button variant="contained" onClick={applyAndCreate} disabled={isCreateButtonDisabled()} className={classes.button}>
                            Apply & create
                        </Button>
                        {/* <Link className={classes.text} component={RouterLink} to={VaultRoutes.createRule.child.createConditions.path} >
                            <Icon className={classes.icon} color="primary">touch_app</Icon>
                            creating
                        </Link>
                        <Typography className={classes.text}>
                            new rule!
                        </Typography> */}
                    </Card>
                </Grid>
            </Grid>
        )
    }

    function isCreateButtonDisabled(){
        return !(global.newRule.actions.length != 0 && global.newRule.conditions.length != 0);
    }

    function applyAndCreate() {
        console.log("send to admin");
    }

    function notFound() {
        return (
            <p> Route not found! </p>
        )
    }

    const [global, setGlobal] = useGlobal();
    console.log('aaa', global.newRule.actions.length)


    const currentRoute = props.location.pathname;
    console.log(currentRoute)
    let element = {};
    switch (currentRoute) {
        case VaultRoutes.createRule.path: {
            element = drawCreatRule();
            break;
        }
        case VaultRoutes.createRule.child.createConditions.path: {
            element = <ConditionIndex />
            break;
        }
        case VaultRoutes.createRule.child.createActions.path: {
            element = <ActionIndex />
            break;
        }
        default:
            element = notFound();
            break;
    }

    return (
        <div>
            {element}
        </div>
    )
}


// VaultCreateRuleSection.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default VaultCreateRuleSection;// withStyles(styles)(VaultCreateRuleSection);


// <Typography className={classes.text}>
//                         Start
//                 </Typography>
//                     <Link className={classes.text} component={RouterLink} to={VaultRoutes.createRule.child.createConditions.path} >
//                         <Icon className={classes.icon} color="primary">touch_app</Icon>
//                         creating
//                     </Link>
//                     <Typography className={classes.text}>
//                         new rule!
//                     </Typography>


