import React, { addCallback } from 'reactn'; // <-- reactn
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '90%',
    backgroundColor: 'aliceblue'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});


function getSteps() {
  return ['Select conditions for your rule', 'Create actions', 'Configure rule'];
}

class JCreateRule extends React.Component {
  isDisabled = false;

  constructor(props) {
    super(props);
    const ruleCreationFromGlobal = this.global.ruleCreation;
    const activeStep = this.global.JCreateRule.activeStep;
    console.log('ctor', activeStep)
    this.state = {
      activeStep: activeStep,
      ruleCreation: {
        isAnyActiveCondition: ruleCreationFromGlobal.isAnyActiveCondition,
        isAnyActiveAction: ruleCreationFromGlobal.isAnyActiveAction,
        isRuleCompleted: ruleCreationFromGlobal.isRuleCompleted
      }
    }

    addCallback(global => {
      console.log('AAAAAA', global);
      this.setState({
        activeStep: global.JCreateRule.activeStep,
        ruleCreation: {
          isAnyActiveCondition: global.ruleCreation.isAnyActiveCondition,
          isAnyActiveAction: global.ruleCreation.isAnyActiveAction,
          isRuleCompleted: global.ruleCreation.isRuleCompleted
        }
      });

      return null;
    });
  }

  handleNext = () => {
    let jCreateRule = this.global.JCreateRule;
    jCreateRule.activeStep = jCreateRule.activeStep+ 1;
    console.log(jCreateRule, 'ppc');
    this.setGlobal({
      JCreateRule:jCreateRule
    })
    // this.setState(prevState => ({
    //   activeStep: prevState.activeStep + 1,
    // }));
  };

  handleBack = () => {
    let jCreateRule = this.global.JCreateRule;
    jCreateRule.activeStep = jCreateRule.activeStep - 1;
    this.setGlobal({
      JCreateRule:jCreateRule
    })
    // this.setState(prevState => ({
    //   activeStep: prevState.activeStep - 1,
    // }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getDisabledState(ruleCreation) {
    if (this.state.activeStep === 0 && !ruleCreation.isAnyActiveCondition) { return true; }
    if (this.state.activeStep === 1 && !ruleCreation.isAnyActiveAction) { return true; }
    if (this.state.activeStep === 1 && !ruleCreation.isRuleCompleted) { return true; }
    return false;
  }

  getBackLink(){
    if (this.state.activeStep === 0) { return "/create-rule/action"; }
    if (this.state.activeStep === 1) { return "/create-rule/action"; }
    if (this.state.activeStep === 2) { return "/create-rule/condition"; }
    return "";
  }

  getNextLink() {
    const ruleCreation = this.state.ruleCreation;
    if (this.state.activeStep === 0 && ruleCreation.isAnyActiveCondition) { return "/create-rule/action"; }
    if (this.state.activeStep === 1 && ruleCreation.isAnyActiveAction) { return "/create-rule/condition"; }
    if (this.state.activeStep === 2 && ruleCreation.isRuleCompleted) { return "/create-rule/rule"; }
    return "";
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
              <div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    href={this.getBackLink()}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href={this.getNextLink()}
                    disabled={this.getDisabledState(this.state.ruleCreation)}
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>

        <Divider variant="middle" />
      </div>
    );
  }
}


JCreateRule.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(JCreateRule);