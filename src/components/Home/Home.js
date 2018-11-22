import React, { Component } from "react";
import Movies from "../Movies/Movies";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <input type="text" placeholder="Search Movies" />
        </div>
        <div>
          <div className="featured">Featured</div>
          <Movies />
        </div>
      </div>
    );
  }
}

export default Home;
