import axios from "axios";
export const MOVIES_FETCH_START = "MOVIES_FETCH_START";
export const MOVIES_FETCH_COMPLETE = "MOVIES_FETCH_COMPLETE";
export const MOVIES_FETCH_ERROR = "MOVIES_FETCH_ERROR";

export const MOVIE_FETCH_START = "MOVIE_FETCH_START";
export const MOVIE_FETCH_COMPLETE = "MOVIE_FETCH_COMPLETE";
export const MOVIE_FETCH_ERROR = "MOVIE_FETCH_ERROR";

export const getMovies = () => {
  return dispatch => {
    dispatch({ type: MOVIES_FETCH_START });
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=b652b831029d5d63d5a4e9c3d5cccc5d&language=en-US&page=1"
      )
      .then(response => {
        console.log(response.data.results[0].original_title);
        dispatch({
          type: MOVIES_FETCH_COMPLETE,
          payload: response.data.results
        });
      })
      .catch(err => {
        dispatch({ type: MOVIES_FETCH_ERROR });
      });
  };
};

export const getMovie = id => {
  return dispatch => {
    dispatch({ type: MOVIE_FETCH_START });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b652b831029d5d63d5a4e9c3d5cccc5d&language=en-US`
      )
      .then(response => {
        console.log(response.data);
        dispatch({ type: MOVIE_FETCH_COMPLETE, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: MOVIE_FETCH_ERROR });
      });
  };
};
