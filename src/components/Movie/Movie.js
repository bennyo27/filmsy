import React from "react";
import { connect } from "react-redux";
import { getMovie } from "../../store/actions/movieActions";
import "./Movie.css";

class Movie extends React.Component {
  //componentDidMount for matching props
  componentDidMount() {
    this.props.getMovie(this.props.match.params.id);
  }

  calcScore(characters, dialogue, story, visuals, audio) {
    let result = characters + dialogue + story + visuals + audio;
    return result / 5;
  }

  render() {
    return (
      <div>
        <div className="movie-page">
          <div className="movie-head">
            <div className="movie-poster">
              <div>
                <img
                  alt="Movie"
                  src={`http://image.tmdb.org/t/p/w300/${
                    this.props.movie.poster_path
                  }`}
                />
              </div>
            </div>
            <div className="movie-title">
              <h1>{this.props.movie.original_title}</h1>
            </div>
          </div>
          <div className="movie-body">
            <div className="movie-bio">
              <p>{this.props.movie.overview}</p>
            </div>
          </div>
        </div>
        <div className="movie-score">
          <h1>{this.calcScore(6, 5, 7, 7, 6)}</h1>
        </div>
      </div>
    );
  }
}

// mapStateToProps
const mapStateToProps = state => ({
  movie: state.moviesReducer.movie,
  fetchingMovie: state.moviesReducer.fetchingMovie
});

// exports
export default connect(
  mapStateToProps,
  { getMovie }
)(Movie);
