import React, { Component } from "react";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul className="navbar">
          <li>
            <NavLink exact to="/" className="button">
              <img
                className="logo"
                src="https://i.gyazo.com/ddfc5a4cd0297ac5474b74a93e6b458e.png"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="button">
              Login
            </NavLink>
          </li>
        </ul>
        <div className="main-content">
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Movie} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
