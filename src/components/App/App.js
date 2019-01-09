import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";
import "./App.css";
import { connect } from "react-redux";
import axios from "axios";
import lock from "../../store/actions/authActions";
import { getProfile, logout } from "../../store/actions/authActions";

class App extends Component {
  componentDidMount() {
    this.props.getProfile();
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
              {!this.props.userData.email && (
                <div
                  className="log-button"
                  onClick={() => {
                    lock.show();
                  }}
                >
                  Login
                </div>
              )}
              {this.props.userData.email && (
                <div
                  className="log-button"
                  onClick={() => {
                    this.props.logout();
                    this.props.history.push("/");
                  }}
                >
                  Logout
                </div>
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

function mapStateToProps(state) {
  return {
    userData: state.authReducer.userData
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getProfile, logout }
  )(App)
);
