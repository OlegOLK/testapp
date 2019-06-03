import React from 'reactn';
import { Card, CardContent, Typography, TextField, CardActions, Button, Switch, FormControlLabel } from '@material-ui/core';
import { Fragment } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    info:{
        marginLeft: "auto"
    }
});

class VaultSendMailAction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipients: "",
            text: "",
            activated: false,
            type: "sendMail",
            id: uuid()
        }
    }

    updateGlobals(state){
         const globalRule = this.global.newRule;
         let globalActions = globalRule.actions;
         const index = globalActions.map(x => x.id).indexOf(this.state.id);
         if (index != -1) {
             let tempAction = globalActions[index];
             tempAction.recipients = this.state.recipients;
             tempAction.text = this.state.text;
             tempAction.active = state != null ? state : this.state.activated;
             tempAction.type = this.state.type;

             globalActions[index] = tempAction;
         }
         else {
             globalActions.push({ active: state, type: this.state.type, recipients: this.state.recipients, id: this.state.id, text: this.state.text });
         }
         globalRule.actions = globalActions;
         this.setGlobal({
             newRule: globalRule
         });
 
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
        this.updateGlobals(null);
      };

    handleChangeActivated = () => event => {
        this.setState({ activated: event.target.checked });
        this.updateGlobals(event.target.checked);
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Card>
                    <CardContent>
                        <Typography>
                            This is new send mail action
                        </Typography>

                        <Typography>
                            Please enter recipients
                            
                        </Typography>
                        <TextField
                                id="standard-full-width"
                                label="Recipients"
                                style={{ margin: 8 }}
                                placeholder="emails"
                                helperText="provide recipients emails"
                                fullWidth
                                margin="normal"
                                value={this.state.recipients}
                                onChange={this.handleChange("recipients")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        <Typography>
                            Please enter text                           
                        </Typography>
                        <TextField
                                id="standard-full-width"
                                label="Text"
                                style={{ margin: 8 }}
                                placeholder="Mail text"                                
                                fullWidth
                                multiline
                                value={this.state.text}
                                onChange={this.handleChange("text")}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Info
                        </Button>
                        <FormControlLabel className={styles.info}
                            control={
                                <Switch
                                    checked={this.state.activated}
                                    onChange={this.handleChangeActivated()}
                                    color="primary"
                                />
                            }
                            label="Activate"
                        />
                    </CardActions>
                </Card>
            </Fragment>
        )
    }
}

VaultSendMailAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VaultSendMailAction);