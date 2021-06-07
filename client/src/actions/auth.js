import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  LOADER_TRUE,
} from './types';
import { setAlert } from './alert';
import SetAuthToken from '../utils/setAuthToken';

//Load User-----------------------------------------------------

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User-------------------------------------------------
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, name, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const error = err.response.data.errors;
      error.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//login User-------------------------------------------------
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const error = err.response.data.errors;
      error.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

/// logout

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOADER_TRUE,
  });

  dispatch({
    type: LOGOUT,
  });
};
