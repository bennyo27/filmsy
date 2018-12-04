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
import * as ACTIONS from "../../store/actions/authActions";
import AuthCheck from "../../auth/auth-check";
import Callback from "../../auth/callback";

export const auth = new Auth();

//Function for automatically handling authentication
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.login_success();
    } else if (!auth.isAuthenticated()) {
      this.props.login_failure();
    }
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
              {!auth.isAuthenticated() && (
                <button
                  onClick={() => {
                    auth.login();
                  }}
                >
                  Login
                </button>
              )}
              {auth.isAuthenticated() && (
                <button
                  onClick={() => {
                    auth.logout();
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
            <Route
              path="/authcheck"
              render={props => <AuthCheck auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
