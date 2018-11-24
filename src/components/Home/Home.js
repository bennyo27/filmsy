import React, { Component } from "react";
import Movies from "../Movies/Movies";
import { connect } from "react-redux";
import { searchMovies } from "../../store/actions";
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
    e.preventDefault();
    this.props.searchMovies(this.state.searchText);
  };

  // pass searchText into the action
  handleSubmit = e => {
    e.preventDefault();
    this.props.searchMovies(this.state.searchText);
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
              className="close-btn"
              onClick={this.handleSubmit}
            >
              Search
            </button>
          </form>
          <div className="results">
            {this.props.searchResults.map(result => {
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
