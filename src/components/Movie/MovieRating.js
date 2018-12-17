import React, { Component } from "react";
import Rating from "react-rating";
import axios from "axios";
import { connect } from "react-redux";

class MovieRating extends Component {
  state = {
    story: 0,
    audio: 0,
    visuals: 0,
    characters: 0,
    dialogue: 0
  };

  // FIX THIS ----------------------------
  ratingFetcher = () => {
    let email = localStorage.getItem("email");
    let movie_id = localStorage.getItem("movie_id");
    console.log(email, movie_id);

    axios
      .get(`http://localhost:3300/users/${email}/movie/${movie_id}`)
      .then(res => {
        console.log(res);
        // if (res.data.reviews) {
        //   let newState = JSON.parse(res.data.reviews);
        //   this.setState({
        //     story: newState.story,
        //     audio: newState.audio,
        //     visuals: newState.visuals,
        //     characters: newState.characters,
        //     dialogue: newState.dialogue
        //   });
        // }
      });
  };

  ratingPost = () => {
    let user_reviews = this.state;
    console.log(this.state);
    let user_email = localStorage.getItem("email");
    let movie_id = this.props.movie_id;
    let reviews = { user_email, movie_id, user_reviews };
    axios
      .get(`http://localhost:3300/users/${user_email}/movie/${movie_id}`)
      .then(res => {
        if (res.data.reviews[0]) {
          // update
          axios.put(
            `http://localhost:3300/users/${user_email}/movie/${movie_id}`,
            user_reviews
          );
        } else {
          // post
          axios.post(`http://localhost:3300/reviews`, reviews);
        }
      });
  };

  // ratings handlers. TODO: Make it all one handler
  handleStoryRating = value => {
    //here set your state for rating
    this.setState(
      {
        story: value
      },
      () => {
        this.ratingPost();
      }
    );
  };
  handleAudioRating = value => {
    //here set your state for rating
    this.setState(
      {
        audio: value
      },
      () => {
        this.ratingPost();
      }
    );
  };
  handleVisualsRating = value => {
    //here set your state for rating
    this.setState(
      {
        visuals: value
      },
      () => {
        this.ratingPost();
      }
    );
  };
  handleCharactersRating = value => {
    //here set your state for rating
    this.setState(
      {
        characters: value
      },
      () => {
        this.ratingPost();
      }
    );
  };
  handleDialogueRating = value => {
    //here set your state for rating
    this.setState(
      {
        dialogue: value
      },
      () => {
        this.ratingPost();
      }
    );
  };

  componentDidMount() {
    this.ratingFetcher();
  }

  render() {
    return (
      <div className="main-score">
        <div className="rating-container">
          <div className="rating-category">
            <h1>Story</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleStoryRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.story}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Audio</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleAudioRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.audio}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Visuals</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleVisualsRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.visuals}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Characters</h1>
          </div>
          <div className="rating-stars">
            <Rating
              onChange={this.handleCharactersRating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.characters}
            />
          </div>
        </div>
        <div className="rating-container">
          <div className="rating-category">
            <h1>Dialogue</h1>
          </div>
          <div className="rating-stars">
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

export default MovieRating;
