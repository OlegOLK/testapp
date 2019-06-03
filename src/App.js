import React from 'react';
import './App.css';
import { UserSession, AppConfig } from 'blockstack';
import { configure } from 'radiks';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from '@material-ui/core';
import VaultAppBar from './components/vault.appBar';
import VaultCreateRuleSection from './components/vault.createRuleSection';
import VaultJumbotron from './components/vault.jumbotron';
import Divider from '@material-ui/core/Divider';
import VaultBreadcrumbs from './components/vault.breadcrumbs';
import { VaultRoutes } from './route';


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

const styles = {
  root: {
    flexGrow: 1
  }
};


const lol = {
  root: {
    Position: "fixed",
    Bottom: "0"
  }
}

function App() {
  return (
    <Router>
      <div style={styles.root}>
        <Grid container spacing={0}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <VaultAppBar />
          </Grid>
          <Divider variant="inset" />
          <Grid item xs={12}>
            <Route path={VaultRoutes.createRule.path} component={VaultJumbotron} />
          </Grid>
          <Divider variant="inset" />
          <Grid item xs={12}>
            <Route path={VaultRoutes.createRule.path} component={VaultCreateRuleSection} />
          </Grid>
          <Grid item xs={12} style={lol.root}>
            <VaultBreadcrumbs />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
