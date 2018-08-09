import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./modules/login";
import Join from "./modules/join";

import logo from "./logo.svg";
import "./App.css";

import { firebaseAuth } from "./firebase";

import { login, setStartState } from "./action/auth";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        console.log("has user");
        const name = user.displayName ? user.displayName : user.email;
        dispatch(login(user.uid, name));

        // dispatch(setStartState());
        if (window.location.href.indexOf("login") !== -1) {
          window.location.href = "http://localhost:3000/#/join";
        }
      } else {
        console.log("there is no user");
        // dispatch(logout());
        // store.dispatch(clearState);
        // renderApp();
        // history.push("/");
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Chat</h1>
        </header>

        <HashRouter>
          <Switch>
            <Route path="/login" component={Login} Redirect />
            <Route path="/join" component={Join} />
            <Redirect from="/" to="/login" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({ dispatch })
)(App);
