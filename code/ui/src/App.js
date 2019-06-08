import React from 'react';
import './App.css';
import { UserSession, AppConfig } from 'blockstack';
import { configure, User, UserGroup  } from 'radiks';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from '@material-ui/core';
import VaultAppBar from './components/vault.appBar';
import VaultCreateRuleSection from './components/vault.createRuleSection';
import VaultJumbotron from './components/vault.jumbotron';
import Divider from '@material-ui/core/Divider';
import VaultBreadcrumbs from './components/vault.breadcrumbs';
import ServerMode from './components/vault.serverMode';
import { VaultRoutes } from './route';
import ConditionIndex from './components/cards/conditions/index';
import ActionIndex from './components/cards/actions/index';

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
});

configure({
  apiServer: 'http://localhost:1260',
  userSession
});

function handleSignIn() {
  userSession.redirectToSignIn();
}

function handleSignOut() {
  userSession.signUserOut(window.location.origin);
  window.location = window.location.origin;
}

async function initializeUserGroup(){
  const groups = await UserGroup.myGroups();
  const myGrp = groups.find(g=> {
      return g.attrs.name === 'demoolk2019';
  });

  if(myGrp){
    return;
  }

  const group = new UserGroup({ name: 'demoolk2019' });
  group.create().then(() => {
    group.makeGroupMembership("the11011.id.blockstack").then(invitation => {
      console.log(invitation);    
      postInvitationId(invitation._id)
    });
  });
}

function postInvitationId(id){
  fetch('https://localhost:44322/api/reciever/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      InvitationId: id
    })
  })
}

function componentWillMount() {
  if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
          User.createWithCurrentUser().then(() => {
              console.log(userData);
              initializeUserGroup().then(x=> {
                console.log(x);
                //window.location = window.location.origin;
              });
              //
          });
      });
  }
}

const styles = {
  root: {
    flexGrow: 1
  }
};


function App() {
   componentWillMount();
  return (
    <Router>
      <div style={styles.root}>
        <Grid container spacing={0}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <VaultAppBar userSession={userSession} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />
          </Grid>
          <Divider variant="inset" />
          <Grid item xs={12}>
            <Route path={VaultRoutes.createRule.path} component={VaultJumbotron} />
          </Grid>
          <Divider variant="inset" />
          <Grid item xs={12}>
            <Route path={VaultRoutes.createRule.path} exact component={VaultCreateRuleSection} />
            <Route path={VaultRoutes.serverMode.path} component={ServerMode} />
            <Route path={VaultRoutes.createRule.child.createConditions.path} component={ConditionIndex} />
            <Route path={VaultRoutes.createRule.child.createActions.path} component={ActionIndex} />
          </Grid>
          <Grid item xs={12} >
            <VaultBreadcrumbs />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
