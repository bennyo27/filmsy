import React, { Component } from "react";
import Movies from "../Movies/Movies";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="searchbar">
          <input type="text" placeholder="Search Movies" />
        </div>
        <div>
          <Movies />
        </div>
        <div className="featured">featured</div>
      </div>
    );
  }
}

export default Home;
