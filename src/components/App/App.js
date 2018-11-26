import React, { Component } from "react";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import Home from "../Home/Home.js";
import Movie from "../Movie/Movie.js";
import { withRouter } from "react-router";

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
              {/* login fix */}
              <div data-netlify-identity-button />
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
