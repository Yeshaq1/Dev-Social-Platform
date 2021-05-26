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

export const createProfile = (formData, history, edit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post('/api/profile', body, config);

    dispatch({
      type: SAVE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });

    const error = err.response.data.errors;
    error.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
  }
};
