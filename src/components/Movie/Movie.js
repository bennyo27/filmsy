import React from "react";
import { connect } from "react-redux";
import { getMovie } from "../../store/actions";

class Movie extends React.Component {
  //componentDidMount for matching props
  componentDidMount() {
    this.props.getMovie(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <img
          alt="Movie"
          src={`http://image.tmdb.org/t/p/w185/${this.props.movie.poster_path}`}
        />
        <h1>{this.props.movie.original_title}</h1>
        <p>{this.props.movie.overview}</p>
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
