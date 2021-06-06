import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated, loading }) => {
  const [formData, updateFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function handleChange(event) {
    const { name, value } = event.target;

    updateFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    login({ email, password });
  }

  if (isAuthenticated && !loading) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Login Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <Alert />
      <form className='form' onSubmit={submit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
