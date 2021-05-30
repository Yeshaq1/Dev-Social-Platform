import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length === 0 ? (
              <h4>There are no Profiles Found</h4>
            ) : (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
};

const mapPropsToState = (state) => ({
  profile: state.profile,
});

export default connect(mapPropsToState, { getAllProfiles })(Profiles);
