import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, SAVE_PROFILE } from './types';
import { setAlert } from './alert';

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

export const createProfile = ({
  company,
  status,
  website,
  skills,
  location,
  bio,
  githubusername,
  twitter,
  facebook,
  youtube,
  linkedin,
  instagram,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    company,
    status,
    website,
    skills,
    location,
    bio,
    githubusername,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  });

  try {
    const res = await axios.post('/api/profile', body, config);

    dispatch({
      type: SAVE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.errors;
    error.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
  }
};
