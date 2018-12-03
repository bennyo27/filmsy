import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import "./App.css";
import auth0 from "auth0-js";
import {
  lock,
  webAuth,
  isAuthenticated,
  logout,
  getProfile
} from "../../auth/auth";
import { userInfo } from "os";

class App extends Component {
  render() {
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
                <button
                  onClick={() => {
                    lock.show();
                  }}
                >
                  Login
                </button>
              )}
              {isAuthenticated() && (
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="App">
          {isAuthenticated() ? getProfile() : "hlelo"}
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
