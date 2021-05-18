import axios from 'axios';
import axois from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
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
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
    console.error(err.message);
  }
};
