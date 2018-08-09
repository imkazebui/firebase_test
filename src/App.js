import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./modules/login";
import Join from "./modules/join";

import logo from "./logo.svg";
import "./connect(null, dispatch => ({dispatch}))(App).css";

import { firebaseAuth } from "./firebase";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user)
        const name = user.displayName ? user.displayName : user.email;
        dispatch(login(user.uid, name));
        dispatch(setStartState());
        // if (history.location.pathname === "/") {
        //   history.push("/join");
        // }
      } else {
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
          <h1 className="App-title">Welcome to React</h1>
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
