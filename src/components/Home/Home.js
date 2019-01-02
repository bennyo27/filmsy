import React, { Component } from "react";
import Movies from "../Movies/Movies";
import { connect } from "react-redux";
import { searchMovies } from "../../store/actions/movieActions";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  // state with search query value
  state = {
    searchText: ""
  };

  // change serach value in state
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  // pass searchText into the action
  handleSubmit = e => {
    e.preventDefault();
    this.props.searchMovies(this.state.searchText);
    let box = document.getElementById("results");
    box.style.display = "inline-block";
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    let box = document.getElementById("results");
    console.log(e.target, box);
    if (e.target != box && box.style.display == "inline-block") {
      box.style.display = "none";
    }
  };

  render() {
    return (
      <div>
        <div className="banner">
          <form className="search" onSubmit={this.handleSubmit}>
            <input
              type="search"
              placeholder="Search Movies"
              onChange={this.onSearchChange}
            />
            <button
              type="button"
              value="search"
              className="search-btn"
              onClick={this.handleSubmit}
            >
              Search
            </button>
          </form>
          <div id="results" ref={node => (this.node = node)}>
            {this.props.searchResults.map(result => {
              if (result !== undefined) {
                return (
                  <Link to={`/${result.id}`}>
                    <div className="result-display">
                      <div className="result-poster">
                        <img
                          alt="Movie"
                          src={`http://image.tmdb.org/t/p/w45/${
                            result.poster_path
                          }`}
                        />
                      </div>
                      <div className="result-title">
                        <h1>{result.original_title}</h1>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
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

// mapStateToProps
const mapStateToProps = state => {
  return {
    searchResults: state.moviesReducer.searchResults
  };
};

// export mapStateToProps and any other functions
export default connect(
  mapStateToProps,
  {
    searchMovies
  }
)(Home);
