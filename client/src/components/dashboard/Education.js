import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map((education) => {
            return (
              <Fragment key={education._id}>
                <tr>
                  <td>{education.school}</td>
                  <td className='hide-sm'>{education.degree}</td>
                  <td className='hide-sm'>
                    <Moment format='YYYY/MM/DD'>{education.from}</Moment> -{' '}
                    {!education.to ? (
                      'Present'
                    ) : (
                      <Moment format='YYYY/MM/DD'>{education.to}</Moment>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteEducation(education._id);
                      }}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
});

export default connect(mapStateToProps, { deleteEducation })(Education);
