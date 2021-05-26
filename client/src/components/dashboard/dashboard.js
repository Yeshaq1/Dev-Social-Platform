import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Alert from '../layout/Alert';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getProfile,
  auth: { user },
  profile: { profile, loading, error },
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
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
