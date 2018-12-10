import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import "./App.css";
import auth0 from "auth0-js";
import { Auth } from "../../auth/auth";
import { userInfo } from "os";
import { connect } from "react-redux";
import AuthCheck from "../../auth/auth-check";
import Auth0Lock from "auth0-lock";
import history from "../../auth/history";

var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL
);

lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  console.log(authResult);
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    console.log(profile);
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("username", profile.nickname);
    localStorage.setItem("email", profile.email);
    localStorage.setItem("email_verified", profile.email_verified);
    window.location.replace("/authcheck");
  });
});

class App extends Component {
  componentDidMount() {}

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
              {true && (
                <button
                  onClick={() => {
                    lock.show();
                  }}
                >
                  Login
                </button>
              )}
              {/* {lock.isAuthenticated() && (
                <button
                  onClick={() => {
                    lock.logout();
                  }}
                >
                  Logout
                </button>
              )} */}
            </li>
          </ul>
        </div>
        <div className="App">
          <div className="main-content">
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Movie} />
            <Route
              path="/authcheck"
              render={props => <AuthCheck lock={lock} {...props} />}
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

export default connect(mapStateToProps)(App);
