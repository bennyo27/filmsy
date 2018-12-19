import React, { Component } from "react";
import Rating from "react-rating";
import axios from "axios";
import { connect } from "react-redux";
import Movie from "./Movie";

class MovieRating extends Component {
  state = {
    story: 0,
    audio: 0,
    visuals: 0,
    characters: 0,
    dialogue: 0,
    averages: {}
  };

  calcScore(story, audio, visuals, characters, dialogue) {
    let result = story + audio + visuals + characters + dialogue;
    return result / 5;
  }

  scoreFetcher = () => {
    let movie_id = this.props.movie_id;
    axios
      .get(`https://filmsy-app.herokuapp.com/reviews/${movie_id}`)
      .then(res => {
        this.setState({ averages: res.data });
      });
  };

  ratingFetcher = () => {
    let email = localStorage.getItem("email");
    let movie_id = this.props.movie_id;

    axios
      .get(`https://filmsy-app.herokuapp.com/users/${email}/movie/${movie_id}`)
      .then(res => {
        console.log(res);
        if (res.data.reviews[0]) {
          console.log(res.data.reviews[0].user_reviews);
          let newState = JSON.parse(res.data.reviews[0].user_reviews);
          this.setState({
            story: newState.story,
            audio: newState.audio,
            visuals: newState.visuals,
            characters: newState.characters,
            dialogue: newState.dialogue
          });
        }
      });
  };

  ratingPost = (story, audio, visuals, characters, dialogue) => {
    let user_reviews = { story, audio, visuals, characters, dialogue };
    let user_email = localStorage.getItem("email");
    let movie_id = this.props.movie_id;
    let reviews = { user_email, movie_id, user_reviews };
    axios
      .get(
        `https://filmsy-app.herokuapp.com/users/${user_email}/movie/${movie_id}`
      )
      .then(res => {
        if (res.data.reviews[0]) {
          // update
          axios.put(
            `https://filmsy-app.herokuapp.comusers/${user_email}/movie/${movie_id}`,
            user_reviews
          );
        } else {
          // post
          axios.post(`https://filmsy-app.herokuapp.com/reviews`, reviews);
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
        this.ratingPost(
          this.state.story,
          this.state.audio,
          this.state.visuals,
          this.state.characters,
          this.state.dialogue
        );
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
        this.ratingPost(
          this.state.story,
          this.state.audio,
          this.state.visuals,
          this.state.characters,
          this.state.dialogue
        );
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
        this.ratingPost(
          this.state.story,
          this.state.audio,
          this.state.visuals,
          this.state.characters,
          this.state.dialogue
        );
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
        this.ratingPost(
          this.state.story,
          this.state.audio,
          this.state.visuals,
          this.state.characters,
          this.state.dialogue
        );
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
        this.ratingPost(
          this.state.story,
          this.state.audio,
          this.state.visuals,
          this.state.characters,
          this.state.dialogue
        );
      }
    );
  };

  componentDidMount() {
    this.ratingFetcher();
    this.scoreFetcher();
  }

  render() {
    return (
      <div className="main-score">
        <div className="user-ratings">
          <div className="user-title">
            <h1>Your Ratings</h1>
          </div>
          <div className="rating-wrapper">
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
          <h2>Your total rating</h2>
          <h2>
            {this.calcScore(
              this.state.story,
              this.state.audio,
              this.state.visuals,
              this.state.characters,
              this.state.dialogue
            )}
          </h2>
        </div>

        <div className="average">
          <div className="average-title">
            <h1>Average Ratings</h1>
          </div>
          <div className="average-scores">
            <div className="average-rating">
              <h2>Story </h2>
              <Rating
                readonly="true"
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={this.state.averages.story_average}
              />
            </div>
            <div className="average-rating">
              <h2>Audio </h2>
              <Rating
                readonly="true"
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={this.state.averages.audio_average}
              />
            </div>
            <div className="average-rating">
              <h2>Visuals </h2>
              <Rating
                readonly="true"
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={this.state.averages.visuals_average}
              />
            </div>
            <div className="average-rating">
              <h2>Characters </h2>
              <Rating
                readonly="true"
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={this.state.averages.characters_average}
              />
            </div>
            <div className="average-rating">
              <h2>Dialogue </h2>
              <Rating
                readonly="true"
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={this.state.averages.dialogue_average}
              />
            </div>
          </div>
          <h2>Average total rating</h2>
          <h2>{this.state.averages.final_score}</h2>
        </div>
      </div>
    );
  }
}

// exports
export default MovieRating;
