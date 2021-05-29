import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Education = ({ education }) => {
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>
          {education.map((education) => {
            return (
              <Fragment>
                <tr>
                  <td>{education.school}</td>
                  <td className='hide-sm'>{education.degree}</td>
                  <td className='hide-sm'>
                    {education.from} - {education.to}
                  </td>
                  <td>
                    <button className='btn btn-danger'>Delete</button>
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
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
});

export default connect(mapStateToProps)(Education);
