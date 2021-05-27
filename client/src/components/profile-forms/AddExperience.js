import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { useHistory, Link } from 'react-router-dom';

const AddExperience = ({ addExperience }) => {
  const [formData, updateFormData] = useState({
    title: '',
    from: '',
    current: true,
    to: '',
    company: '',
    location: '',
    description: '',
  });

  const { title, from, current, to, company, location, description } = formData;

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

    addExperience(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
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
            Current Job
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
            placeholder='Job Description'
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
