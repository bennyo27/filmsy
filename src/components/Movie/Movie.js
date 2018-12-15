import React from "react";
import { connect } from "react-redux";
import { getMovie } from "../../store/actions/movieActions";
import "./Movie.css";
import Rating from "react-rating";

class Movie extends React.Component {
  state = {
    story: 0,
    audio: 0,
    visuals: 0,
    characters: 0,
    dialogue: 0
  };

  handleStoryRating = value => {
    //here set your state for rating
    this.setState({
      story: value
    });
  };

  handleAudioRating = value => {
    //here set your state for rating
    this.setState({
      audio: value
    });
  };

  handleVisualsRating = value => {
    //here set your state for rating
    this.setState({
      visuals: value
    });
  };

  handleCharactersRating = value => {
    //here set your state for rating
    this.setState({
      characters: value
    });
  };

  handleDialogueRating = value => {
    //here set your state for rating
    this.setState({
      dialogue: value
    });
  };

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
          <div className="main-score">
            <Rating
              onChange={this.handleStoryRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.story}
            />
            <Rating
              onChange={this.handleAudioRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.audio}
            />
            <Rating
              onChange={this.handleVisualsRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.visuals}
            />
            <Rating
              onChange={this.handleCharactersRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.characters}
            />
            <Rating
              onChange={this.handleDialogueRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.dialogue}
            />
          </div>
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
