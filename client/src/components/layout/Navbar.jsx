import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const loggedIn = (
    <ul>
      <li>
        <NavLink to='#!' onClick={logout}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </NavLink>
      </li>
    </ul>
  );

  const notLoggedin = (
    <ul>
      <li>
        <NavLink to='#!'>Developers</NavLink>
      </li>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <NavLink to='/'>
          <i className='fas fa-code'></i> DevConnector
        </NavLink>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? loggedIn : notLoggedin}</Fragment>
      )}
    </nav>
  );
};

Navbar.prototypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
