import React, { Fragment } from 'reactn';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const styles = () => ({
    card: {
        width: "250px",
    },
    media: {
        height: 140,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    div: {
        marginRight: '10em',
        marginLeft: '10em'
    },
    textField: {
        width: 200,
    },
});

class VaultDateTimeCondition extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date(),
            activated: false,
            type: "date",
            id: uuid()
        }
    }

    handleDateChange(date) {
        this.setState({
            selectedDate: date
        });
        console.log("date changed", date, this.state.selectedDate)
        this.updateGlobalConditions(this.state.activated, date);
    }

    updateGlobalConditions(state, date) {
        const rule = this.global.newRule;
        let globalConditions = rule.conditions;
        const index = globalConditions.map(x => x.id).indexOf(this.state.id);
        if (index !== -1) {
            let tempCondition = globalConditions[index];
            tempCondition.triggerTime = date;
            tempCondition.active = state;
            globalConditions[index] = tempCondition;
        }
        else {
            globalConditions.push({ active: state, type: this.state.type, triggerTime: date, id: this.state.id });
        }
        rule.conditions = globalConditions;
        this.setGlobal({
            newRule: rule
        });

        console.log(this.global);
    }

    handleChange = () => event => {
        this.setState({ activated: event.target.checked });
        this.updateGlobalConditions(event.target.checked, this.state.selectedDate);
    };


    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image='http://static1.squarespace.com/static/599327e56b8f5b29a7f66773/t/59e12c9629f187419b21ed1e/1507929239914/CREATE_LOGO.png?format=1500w'
                        title="Create rule img"
                    />
                    <CardContent>
                        <Fragment>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    label="Select trigger date"
                                    value={this.state.selectedDate}
                                    onChange={date => this.handleDateChange(date)}
                                    minDate={new Date()}
                                    format="MM/dd/yyyy"
                                    autoOk={true}
                                />
                            </MuiPickersUtilsProvider>

                        </Fragment>
                        <Typography component="p">
                            Condition description
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Info
                    </Button>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.activated}
                                    onChange={this.handleChange()}
                                    color="primary"
                                />
                            }
                            label="Activate"
                        />
                    </CardActions>
                </Card>
            </Grid>

        );
    }
}

VaultDateTimeCondition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VaultDateTimeCondition);