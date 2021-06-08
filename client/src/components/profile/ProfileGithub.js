import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({
  profile: { githubusername },
  repos,
  getGithubRepos,
}) => {
  useEffect(() => {
    getGithubRepos(githubusername);
  }, [getGithubRepos, githubusername]);
  return (
    <Fragment>
      {repos != null ? (
        <div className='profile-github'>
          <h2 className='text-primary my-1'>
            <i className='fab fa-github'></i> Github Repos
          </h2>
          {repos.length < 1 ? (
            <h4>No Github Repos Found</h4>
          ) : (
            <Fragment>
              {repos.map((repo, index) => (
                <div key={index} className='repo bg-white p-1 my-1'>
                  <div>
                    <h4>
                      <a
                        href={repo.html_url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Repo {index + 1}
                        {''} {repo.name}
                      </a>
                    </h4>
                    <p>{repo.description}</p>
                  </div>
                  <div>
                    <ul>
                      <li className='badge badge-primary'>
                        Stars: {repo.stargazers_count}
                      </li>
                      <li className='badge badge-dark'>
                        Watchers: {repo.watchers_count}
                      </li>
                      <li className='badge badge-light'>
                        Forks: {repo.forks_count}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </Fragment>
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
