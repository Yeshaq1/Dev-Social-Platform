import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { useHistory, Link } from 'react-router-dom';

const AddEducation = ({ addEducation }) => {
  const [formData, updateFormData] = useState({
    school: '',
    from: '',
    degree: '',
    to: '',
    fieldofstudy: '',
    description: '',
    current: false,
  });

  const {
    school,
    from,
    degree,
    to,
    fieldofstudy,
    description,
    current,
  } = formData;

  let history = useHistory();

  const handleChange = (event) => {
    updateFormData(() => {
      return {
        ...formData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addEducation(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
            value={school}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
            value={degree}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              onChange={(e) => {
                updateFormData({
                  ...formData,
                  current: e.target.checked,
                });
              }}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        {!current ? (
          <Fragment>
            <div className='form-group'>
              <h4>To Date</h4>
              <input type='date' name='to' value={to} onChange={handleChange} />
            </div>
          </Fragment>
        ) : null}

        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back{' '}
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
