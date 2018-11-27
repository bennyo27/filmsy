import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";
import Auth from "../../auth/auth";
import { Button } from "react-bootstrap";
import "./App.css";

const auth = new Auth();

class App extends Component {
  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;
    return (
      <div>
        <div className="navbar">
          <ul>
            <li>
              <NavLink exact to="/" className="button">
                <img
                  className="logo"
                  src="https://fontmeme.com/permalink/181124/118105101c49e97a2659b34a8b6bf1f1.png"
                />
              </NavLink>
            </li>
            <li>
              {!isAuthenticated() && (
                <Button
                  id="qsLoginBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                </Button>
              )}
              {isAuthenticated() && (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              )}
            </li>
          </ul>
        </div>
        <div className="App">
          <div className="main-content">
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Movie} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
