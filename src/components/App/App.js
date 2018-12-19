import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";
import "./App.css";
import { connect } from "react-redux";
import Auth0Lock from "auth0-lock";
import axios from "axios";

var lock = new Auth0Lock(
  "lElY8YB0H8bbaVlBUExJteiEmVxweAha",
  "dashboard-app.auth0.com"
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
    window.location.reload();
  });
});

class App extends Component {
  constructor() {
    super();
    this.send_profile_to_db = this.send_profile_to_db.bind(this);
  }

  send_profile_to_db(username, email, email_verified) {
    const data = { username, email, email_verified };
    axios.post("https://filmsy-app.herokuapp.com/users", data).then(() => {
      axios.get(`https://filmsy-app.herokuapp.com/users/${email}`).then(res => {
        console.log(res.data);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("email_verified", res.data.email_verified);
      });
    });
  }

  componentDidMount() {
    this.send_profile_to_db(
      localStorage.getItem("username"),
      localStorage.getItem("email"),
      localStorage.getItem("email_verified")
    );
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
                  alt="filmsy-logo"
                  src="https://fontmeme.com/permalink/181124/118105101c49e97a2659b34a8b6bf1f1.png"
                />
              </NavLink>
            </li>
            <li>
              {!localStorage.getItem("accessToken") && (
                <button
                  onClick={() => {
                    lock.show();
                  }}
                >
                  Login
                </button>
              )}
              {localStorage.getItem("accessToken") && (
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("username");
                    localStorage.removeItem("email");
                    localStorage.removeItem("email_verified");
                    this.props.history.push("/");
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
            <Route path="/:id" component={Movie} />} />
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

export default withRouter(connect(mapStateToProps)(App));
