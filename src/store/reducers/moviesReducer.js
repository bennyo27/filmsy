import {
  MOVIES_FETCH_START,
  MOVIES_FETCH_COMPLETE,
  MOVIES_FETCH_ERROR,
  MOVIE_FETCH_START,
  MOVIE_FETCH_COMPLETE,
  MOVIE_FETCH_ERROR
} from "../actions";

const initialState = {
  movies: [],
  movie: [],
  fetchingMovies: false,
  moviesFetched: false,
  fetchingMovie: false,
  movieFetched: false,
  error: ""
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_FETCH_START:
      return {
        ...state,
        fetchingMovies: true
      };

    case MOVIES_FETCH_COMPLETE:
      return {
        ...state,
        movies: action.payload,
        fetchingMovies: true,
        moviesFetched: true
      };

    case MOVIES_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching movies"
      };

    case MOVIE_FETCH_START:
      return {
        ...state,
        fetchingMovie: true
      };

    case MOVIE_FETCH_COMPLETE:
      return {
        ...state,
        movie: action.payload,
        fetchingMovie: true,
        movieFetched: true
      };

    case MOVIE_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching movie"
      };

    default:
      return state;
  }
};

export default moviesReducer;
