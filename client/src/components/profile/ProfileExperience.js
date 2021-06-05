import Moment from 'react-moment';
import { Fragment } from 'react';

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className='profile-exp bg-white p-2'>
      {experience.length > 0 ? (
        <Fragment>
          <h2 className='text-primary'>Experience</h2>
          {experience.map((exp, index) => (
            <div key={index}>
              <h3 className='text-dark'>{exp.company}</h3>
              <p>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                {exp.current ? (
                  <span>current</span>
                ) : exp.to ? (
                  <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                ) : null}
              </p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
              {exp.description && (
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </Fragment>
      ) : (
        <h4>No Experience Credentials</h4>
      )}
    </div>
  );
};

export default ProfileExperience;
