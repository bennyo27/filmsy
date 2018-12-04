import {
  MOVIES_FETCH_START,
  MOVIES_FETCH_COMPLETE,
  MOVIES_FETCH_ERROR,
  MOVIE_FETCH_START,
  MOVIE_FETCH_COMPLETE,
  MOVIE_FETCH_ERROR,
  MOVIE_SEARCH_START,
  MOVIE_SEARCH_COMPLETE,
  MOVIE_SEARCH_ERROR
} from "../actions/movieActions";

const initialState = {
  movies: [],
  movie: [],
  searchResults: [],
  fetchingMovies: false,
  moviesFetched: false,
  fetchingMovie: false,
  movieFetched: false,
  searchingMovies: false,
  searchedMovies: false,
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

    case MOVIE_SEARCH_START:
      return {
        ...state,
        searchingMovies: true
      };

    case MOVIE_SEARCH_COMPLETE:
      return {
        ...state,
        searchResults: action.payload,
        searchingMovies: false,
        searchedMovies: true
      };

    case MOVIE_SEARCH_ERROR:
      return {
        ...state,
        error: "Error searching for movies"
      };

    default:
      return state;
  }
};

export default moviesReducer;
