import React from "react";
import { connect } from "react-redux";
import { getMovies } from "../../store/actions";
import { Link } from "react-router-dom";
import "./Movies.css";

class Movies extends React.Component {
  // retrieve movies
  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    return (
      <div className="moviesListDisplay">
        <div className="movieDisplay">
          {this.props.movies.map(movie => {
            return (
              <Link to={`/${movie.id}`}>
                <div className="moviesDisplay">
                  <img
                    alt="Movie"
                    src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  />
                  <h1>{movie.original_title}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

// mapStateToProps
const mapStateToProps = state => {
  return {
    movies: state.moviesReducer.movies
  };
};

// export mapStateToProps and any functions
export default connect(
  mapStateToProps,
  {
    getMovies
  }
)(Movies);
