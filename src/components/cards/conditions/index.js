import VaultDateTimeCondition from './vault.dateTime';
import React, { Fragment, addCallback, setGlobal } from 'reactn';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { VaultRoutes } from '../../../route';
import { Link } from 'react-router-dom';

// addCallback(global => {

//     // If the global state was changed to 1, change it to 2.
//     if (global.value === 1) {
//       return { value: 2 };
//     }

//     // If the global state is anything other than 1, don't change it.
//     return null;
//   });
const styles = theme => ({
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

class ConditionIndex extends React.Component {
    callbackSubscriber = {};
    constructor(props) {
        super(props);

        this.state = {
            components: [
                VaultDateTimeCondition
            ],
            anyActiveConditions: this.getActiveConditions()
        }

    this.callbackSubscriber = addCallback(global => {
            const globalConditions = global.newRule.conditions;
            if (globalConditions.length > 0) {
                this.setState({
                    anyActiveConditions: this.getActiveConditions()
                });
            }
        });
    }

    componentWillUnmount(){
        this.callbackSubscriber();        
    }

    getActiveConditions() {
        const rule = this.global.newRule;
        if (!rule || !rule.conditions) { return false; }
        return rule.conditions.some(x => x.active == true);
    }

    render() {
        const { classes } = this.props;
        const elements = [];
        let components = this.state.components;
        components.map((Comp, index) => {
            elements.push(
            <Grid item xs={12} md={5}>
                <Comp key={index} />
            </Grid>    
            )
            return Comp;
        });
        return (
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
                            disabled={!this.state.anyActiveConditions}
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
                    spacing={4}
                >
                    {elements}
                </Grid>
            </Fragment>
        )
    }
}

ConditionIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConditionIndex);