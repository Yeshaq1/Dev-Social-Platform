import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';

const PostItem = ({ post, auth }) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img class='round-img' src={post.avatar} alt='' />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>{post.text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
        </p>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-up'></i>{' '}
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${post._id}`} class='btn btn-primary'>
          Discussion{' '}
          {post.comments.length > 0 && (
            <span class='comment-count'>{post.comments.length}</span>
          )}
        </Link>
        {!auth.loading && auth.user._id === post.user ? (
          <button type='button' class='btn btn-danger'>
            <i class='fas fa-times'></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
