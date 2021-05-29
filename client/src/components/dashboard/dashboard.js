import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfile, deleteAccount } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Alert from '../layout/Alert';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = ({
  getProfile,
  auth: { user },
  profile: { profile, loading, error },
  deleteAccount,
}) => {
  useEffect(() => {
    getProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience />
          <Education />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
      <div className='my-2'>
        <button
          onClick={() => {
            deleteAccount();
          }}
          className='btn btn-danger'
        >
          <i className='fas fa-user-minus'></i>
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, deleteAccount })(
  Dashboard
);
