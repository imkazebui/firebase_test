import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./modules/login";
import Join from "./modules/join";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
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

export default App;
