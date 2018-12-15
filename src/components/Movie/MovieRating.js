import React, { Component } from "react";
import Rating from "react-rating";

class MovieRating extends Component {
  state = {
    movieRatings: {
      story: null,
      audio: null,
      visuals: null,
      characters: null,
      dialogue: null
    }
  };

  handleRatings = event => {
    this.setState({
      movieRatings: {
        ...this.state.movieRatings,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div className="main-score">
        {console.log(this.state.movieRatings)}
        <div className="rating-container">
          <div className="rating-category">
            <h1>Story</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleRatings}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.movieRatings.story}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Audio</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleRatings}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.movieRatings.audio}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Visuals</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleRatings}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.movieRatings.visuals}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Characters</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleRatings}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.movieRatings.characters}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Dialogue</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleRatings}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.movieRatings.dialogue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieRating;
