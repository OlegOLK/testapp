import React, { useGlobal } from 'reactn';
import { UserGroup  } from 'radiks';
import { Grid, Link, Card, CardHeader, Avatar, Fab, IconButton, Badge, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { VaultRoutes } from '../route';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { SendMailAction } from '../../src/models/basicAction';
import { DateTimeCondition } from '../../src/models/basicCondition';
import { BasicRule } from '../../src/models/basicRule';
import { RulesList } from './vault.rulesList'

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
                <RulesList />
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
                        <br />

                        <Button variant="contained" onClick={applyAndCreate} className={classes.button}> 
                        {/* disabled={isCreateButtonDisabled()} */}
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


    async function applyAndCreate() {

        // const invitation = await GroupInvitation.findById("9da5e40a7d37-49da-a293-bbf297b92f32");
        // console.log(invitation, 'inv');
        // await invitation.activate();

        const groups = await UserGroup.myGroups();
        console.log(groups);

        const myGrp = groups.find(g=> {
            return g.attrs.name === 'demoolk2019';
        });
        console.log(myGrp)
        

        // myGrp.makeGroupMembership("the11011.id.blockstack").then(invitation => {
        //    console.log(invitation);
        // });

        // if(!myGrp){
        //     return;
        // }

        // const res = await BasicRule.fetchList({userGroupId:  myGrp._id});
        // console.log(res);


        // const grp = await UserGroup.findById("5dd10c35aa14-41ac-9d89-76d7f6e48e1c");
        // console.log(grp, "gr[p");

        // if (!grp) {
        //     return;
        // }

        // const group = new UserGroup({ name: 'hz' });
        // await group.create();

        // const grpRes = await group.create();
        // console.log('grpRes', grpRes);



        //rab
      





        const rule = global.newRule;

        const radiksRule = new BasicRule({ type: 'base rule', title: 'hdsajkdash', active: true, userGroupId:  myGrp._id});
        await radiksRule.save();


        for (let i = 0; i < rule.conditions.length; i++) {
            let cond = new DateTimeCondition({ ruleId: radiksRule._id, active: true, triggerTime: rule.conditions[i].triggerTime, userGroupId:  myGrp._id });
            await cond.save();
        }

        for (let i = 0; i < rule.actions.length; i++) {
            let action = new SendMailAction({ ruleId: radiksRule._id, active: true, recep: rule.actions[i].recipient, text: rule.actions[i].text, from: 'me', userGroupId:  myGrp._id });
            await action.save();
        }

        window.location.reload();
    }


    const [global] = useGlobal();


    const currentRoute = props.location.pathname;
    console.log(currentRoute)
    let element = drawCreatRule();

    return (
        <div>
            {element}
        </div>
    )
}

export default VaultCreateRuleSection;
