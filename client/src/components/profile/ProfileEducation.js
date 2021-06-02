import Moment from 'react-moment';

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education
        ? education.map((edu, index) => (
            <div key={index}>
              <h3>{edu.school}</h3>
              <p>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.current ? (
                  <span>current</span>
                ) : edu.to ? (
                  <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                ) : null}
              </p>
              <p>
                <strong>Degree: </strong> {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong> {edu.fieldofstudy}
              </p>
              {edu.description && (
                <p>
                  <strong>Description: </strong>
                  {edu.description}
                </p>
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default ProfileEducation;
