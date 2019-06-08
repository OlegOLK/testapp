import React, { Fragment, addCallback } from 'reactn';
import { Grid, Button } from '@material-ui/core';
import VaultSendMailAction from './vault.sendMail';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { VaultRoutes } from '../../../route';
import { Link } from 'react-router-dom';

const styles = () => ({
    backButton: {
        marginLeft: 0,
        float: "left",
    },
    nextButton: {
        marginRight: 0,
        float: "right",
    },
});

const BackLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
const OkLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class ActionIndex extends React.Component {
    callbackSubscriber = {};
    constructor(props){
        super(props);

        this.state = {
            components: [
                VaultSendMailAction
            ],
            anyActiveActions: this.getActiveActions()
        }

        this.callbackSubscriber = addCallback(global => {
            const globalActions = global.newRule.actions;
            if (globalActions.length > 0) {
                this.setState({
                    anyActiveActions: this.getActiveActions()
                });
            }
        });
    }

    getActiveActions() {
        const rule = this.global.newRule;
        if (!rule || !rule.actions) { return false; }
        return rule.actions.some(x => x.active === true);
    }

    render(){
        const { classes } = this.props;
        const elements = [];
        let components = this.state.components;
        components.map((Comp, index) => {
            elements.push(
            <Grid item xs={12} md={4} key={index}>
                <Comp key={index} />
            </Grid>            
            )
            return Comp;
        });

        return(
            <Fragment>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="baseline">

                    <Grid item xs={5} md={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.backButton}
                            component={BackLink}
                            to={VaultRoutes.createRule.path}
                        >
                            Back
                        </Button>
                    </Grid>

                    <Grid item xs={5} md={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!this.state.anyActiveActions}
                            className={classes.nextButton}
                            component={OkLink}
                            to={VaultRoutes.createRule.path}
                        >
                            OK
                        </Button>
                    </Grid>


                </Grid>


                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    {elements}
                </Grid>
            </Fragment>
        )
    }
}

ActionIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionIndex);