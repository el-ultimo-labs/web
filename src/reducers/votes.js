import {
  INIT_STATE,
  LOAD_VOTES,
  ADVANCE,
  FAVORITE,
  UPVOTE,
  DOWNVOTE,
  SADVOTE,
  DO_FAVORITE_START,
  DO_FAVORITE_COMPLETE,
} from '../constants/ActionTypes';

const initialState = {
  upvotes: [],
  downvotes: [],
  sadvotes: [],
  favorites: [],
};

function setVotes(state, stats) {
  return {
    ...state,
    upvotes: stats.upvotes,
    downvotes: stats.downvotes,
    sadvotes: stats.sadvotes,
    favorites: stats.favorites,
  };
}

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case INIT_STATE: {
      const { stats } = payload.booth ?? {};
      if (stats) {
        return setVotes(state, stats);
      }
      return initialState;
    }
    case ADVANCE:
      return initialState;
    case LOAD_VOTES:
      return setVotes(state, payload);
    case UPVOTE:
      return {
        ...state,
        upvotes: [...state.upvotes, payload.userID],
      };
    case DOWNVOTE:
      return {
        ...state,
        downvotes: [...state.downvotes, payload.userID],
      };
    case SADVOTE:
      return {
        ...state,
        sadvotes: [...state.sadvotes, payload.userID],
      };
    case FAVORITE:
      if (state.favorites.includes(payload.userID)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, payload.userID],
      };
    case DO_FAVORITE_START:
      return state;
    case DO_FAVORITE_COMPLETE:
      return state;
    default:
      return state;
  }
}
