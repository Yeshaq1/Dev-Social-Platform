import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getGithubRepos, getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  auth,
  profile: { profile, repos, loading },
  match,
  getGithubRepos,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {!profile || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
          !auth.loading &&
          auth.user._id === profile.user._id ? (
            <Link to='/edit-profile' className='btn btn-light'>
              Edit Profile
            </Link>
          ) : null}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileEducation profile={profile} />
            <ProfileExperience profile={profile} />
            {profile.githubusername ? (
              <ProfileGithub profile={profile} />
            ) : (
              <h4>No Github Repos</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById, getGithubRepos })(
  Profile
);
