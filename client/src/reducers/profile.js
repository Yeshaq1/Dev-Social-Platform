import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOADER_TRUE,
  SAVE_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  REPO_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADER_TRUE:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
    case SAVE_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {},
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        error: {},
      };

    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };

    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: payload,
      };

    case REPO_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
