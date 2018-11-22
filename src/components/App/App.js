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
        <ul>
          <li>
            <NavLink exact to="/" className="button">
              LOGO
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="button">
              login
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
