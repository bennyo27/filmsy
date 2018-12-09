import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import "./App.css";
import auth0 from "auth0-js";
import { lock, Auth } from "../../auth/auth";
import { userInfo } from "os";
import { connect } from "react-redux";
import AuthCheck from "../../auth/auth-check";

class App extends Component {
  componentDidMount() {
    this.props.auth.handleAuthentication();
  }

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
              {!this.props.auth.isAuthenticated() && (
                <button
                  onClick={() => {
                    this.props.auth.login();
                  }}
                >
                  Login
                </button>
              )}
              {this.props.auth.isAuthenticated() && (
                <button
                  onClick={() => {
                    this.props.auth.logout();
                  }}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="App">
          <div className="main-content">
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Movie} />
            <Route path="/authcheck" component={AuthCheck} />} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    auth: state.authReducer.auth
  };
}

export default connect(mapStateToProps)(App);
