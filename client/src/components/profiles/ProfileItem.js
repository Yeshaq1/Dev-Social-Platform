import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={profile.user.avatar} alt='' />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}{' '}
          {profile.company && <span> at {profile.company}</span>}
        </p>
        <p>{profile.location}</p>
        <Link to={`profile/${profile._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {profile.skills.slice(0, 4).map((skill, index) => (
          <li key={index} class='text-primary'>
            <i class='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
