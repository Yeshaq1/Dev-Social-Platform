import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOADER_TRUE,
  SAVE_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
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
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: [],
        error: {},
      };
    default:
      return state;
  }
}
