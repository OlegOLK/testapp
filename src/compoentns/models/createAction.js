import React from 'reactn';
import { Grid, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }


class RenderSendMailAction extends React.Component {
    static styles = {
        card: {
            maxWidth: 250,
        },
        media: {
            height: 140,
        },
        textField:{
            height: 'auto'
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

    state = {
        textDialogOpen: false,
        recepientDialogOpen: false,
        activated: false,
        action: {}
      };
    
      handleTextClickOpen = () => {
        this.setState({ textDialogOpen: true });
      };
    
      handleTextClose = () => {
        this.setState({ textDialogOpen: false });
      };

      handleRecepientClickOpen = () => {
        this.setState({ recepientDialogOpen: true });
      };
    
      handleRecepientClose = () => {
        this.setState({ recepientDialogOpen: false });
      };
    
      handleRecepientSave = () => {
        this.setState({ 
            recepientDialogOpen: false,
        });
        console.log(this.state)
      };

      handleChange = name => event => {
        console.log(this.global);
        this.setState({ [name]: event.target.checked });
        this.props.onChange(this.props.index, event.target.checked)
      };

    handleRecipientsChange = recipients => event => {
        const old = this.state.action;
        old.recipients = event.target.value;
        this.setState({ action: old });
    };

    handleTextChange = () => event => {
        const old = this.state.action;
        old.text = event.target.value;
        this.setState({ action: old });
    };
   
    render() {
        return (
            <Grid item xs={12} sm={6} lg={2}>
                <Card style={RenderSendMailAction.styles.card}>
                    <CardMedia
                        style={RenderSendMailAction.styles.media}
                        image='http://static1.squarespace.com/static/599327e56b8f5b29a7f66773/t/59e12c9629f187419b21ed1e/1507929239914/CREATE_LOGO.png?format=1500w'
                        title="Create rule img"
                    />
                    <CardContent>
                        <Button variant="outlined" color="primary" onClick={this.handleRecepientClickOpen}>
                            Add mail recipients
                        </Button>

                        <Button variant="outlined" color="primary" onClick={this.handleTextClickOpen}>
                            Add mail text
                        </Button>


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
                                onChange={this.handleChange('activated')}
                                value="activated" />
                        } label="Active" />
                    </CardActions>
                </Card>

            <Dialog
              open={this.state.recepientDialogOpen}
              onClose={this.handleRecepientClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Recipients</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter recipients emails for notification about rule conditions trigger.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="normal"
                  id="name"
                  label="Recipients email Address, divide by ;"
                  fullWidth
                  value={this.state.action.recipients }
                  onChange={this.handleRecipientsChange('recipients')}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRecepientClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleRecepientSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.textDialogOpen}
              fullScreen
              TransitionComponent={Transition}
              onClose={this.handleTextClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Mail text</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter email text
                </DialogContentText>
                <TextField
                  autoFocus
                  fullWidth
                  margin="normal"
                  multiline
                  rowsMax="4"
                  id="text"
                  label="Email text"
                  value={this.state.action.text}
                  onChange={this.handleTextChange()}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleTextClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleTextClose} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>

           
            </Grid>

        );
    }
}

export class CreateActionElement extends React.Component {
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
        let ruleCreation  = this.global.ruleCreation;    

        if(activated){
            ruleCreation.isAnyActiveCondition =  true;
            this.setState({
                activated: true
            });
        }else{
            ruleCreation.isAnyActiveCondition =  false;
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
                        <Button variant="contained"  href='/create-rule/action' size="medium" color="primary">
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
                    <RenderSendMailAction index={0} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={1} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={2} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={3} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={4} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={5} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={6} onChange={this.handleActivateCondition.bind(this)} />
                    <RenderSendMailAction index={7} onChange={this.handleActivateCondition.bind(this)} />
                </Grid>
            </div>
        )
    }
}