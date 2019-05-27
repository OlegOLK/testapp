import React from 'reactn';
import TextField from '@material-ui/core/TextField';
import { Grid, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import uuid from 'uuid/v4'


class RenderDateTimeCondition extends React.Component {

    static styles = {
        card: {
            maxWidth: 250,
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
    };

    constructor(props){
        super(props);

        this.state ={
            activated : false,
            condition: {
                type: "date",
                value: new Date(),
                id: uuid(),
            }
        }
    }

    updateGlobalState(){
            const rule = this.global.rule;
            const componentConditionIndex = rule.conditions.indexOf(x=> x.id == this.state.condition.id);
            if(componentConditionIndex != -1){
                rule.conditions[componentConditionIndex] = this.state.condition
            }
            else{
                rule.conditions.push(this.state.condition);
            }

            this.setGlobal({
                rule: rule
            });


            console.log('destroy', this.global);
    }

    handleChange = () => event => {
        this.setState({ activated: event.target.checked });   
        this.props.onChange(this.props.index, event.target.checked);
        if(event.target.checked){
            this.updateGlobalState();
        }
    };

    getDefaultDateValue() {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + date.getDate();
    }

    onChangeDate = date => {
        console.log(date, 'onChangeDate');
        const stateCondition = this.state.condition;
        stateCondition.value = date;
        this.setState({
            condition: stateCondition
        });
    } 

    render() {
        return (
            <Grid item xs={12} sm={6} lg={2}>
                <Card style={RenderDateTimeCondition.styles.card}>
                    <CardMedia
                        style={RenderDateTimeCondition.styles.media}
                        image='http://static1.squarespace.com/static/599327e56b8f5b29a7f66773/t/59e12c9629f187419b21ed1e/1507929239914/CREATE_LOGO.png?format=1500w'
                        title="Create rule img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <form style={RenderDateTimeCondition.styles.container} noValidate>
                                <TextField
                                    id="date"
                                    label="Date condition"
                                    type="date"
                                    value={this.getDefaultDateValue()}
                                    onChange={this.onChangeDate}
                                    style={RenderDateTimeCondition.styles.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </Typography>
                        <Typography component="p">
                            Create rule description
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Info
                    </Button>
                        <FormControlLabel control={
                            <Switch checked={this.state.activated}
                                onChange={this.handleChange()}
                                value="activated" />
                        } label="Active" />
                    </CardActions>
                </Card>
            </Grid>

        );
    }
}

export class CreateConditionElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasActiveCondition: Array(7).fill(false),
            activated: false
        }
    }


    handleActivateCondition(index, value) {
        this.state.hasActiveCondition[index] = value;
        this.forceUpdate();
        const activated = this.state.hasActiveCondition.find(x => x === true);
        let ruleCreation = this.global.ruleCreation;

        if (activated) {
            ruleCreation.isAnyActiveCondition = true;
            this.setState({
                activated: true
            });
        } else {
            ruleCreation.isAnyActiveCondition = false;
            this.setState({
                activated: false
            });
        }

        this.setGlobal({
            ruleCreation: ruleCreation
        });
    }

    render() {

        return (
            <div>
                {
                    this.state.activated ? (
                        <Button variant="contained" href='/create-rule/action' size="medium" color="primary">
                            Next
                        </Button>
                    )
                        :
                        (<Button variant="contained" size="medium" disabled color="primary">
                            Next
                        </Button>)
                }
                <Divider variant="middle" />
                <Grid container spacing={8}>
                    <RenderDateTimeCondition index={0} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={1} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={2} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={3} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={4} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={5} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={6} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderDateTimeCondition index={7} onChange={this.handleActivateCondition.bind(this)} />
                </Grid>
            </div>
        )
    }
}