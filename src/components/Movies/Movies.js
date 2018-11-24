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
                  <div className="poster">
                    <img
                      alt="Movie"
                      src={`http://image.tmdb.org/t/p/w300/${
                        movie.poster_path
                      }`}
                    />
                  </div>
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
