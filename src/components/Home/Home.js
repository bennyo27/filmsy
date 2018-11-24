import React, { Component } from "react";
import Movies from "../Movies/Movies";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <div className="search">
            <input type="text" placeholder="Search Movies" />
          </div>
        </div>
        <div>
          <div className="featured">
            <h1>Featured</h1>
          </div>
          <Movies />
        </div>
      </div>
    );
  }
}

export default Home;
