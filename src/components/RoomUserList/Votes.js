import React from 'react';
import PropTypes from 'prop-types';
import SadvoteIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UpvoteIcon from '@mui/icons-material/ThumbUp';

const Votes = ({
  upvote, downvote, sadvote, favorite, ...props
}) => (
  <div {...props}>
    {favorite && (
      <FavoriteIcon className="UserRow-voteIcon UserRow-voteIcon--favorite" />
    )}
    {sadvote > 0 && (
      <div className="ResponseButton-content">
        <SadvoteIcon className="UserRow-voteIcon UserRow-voteIcon--sadvote" />
        <span className="ResponseButton-count">{sadvote}</span>
      </div>
    )}
    {upvote > 0 && (
      <div className="ResponseButton-content">
        <UpvoteIcon className="UserRow-voteIcon UserRow-voteIcon--upvote" />
        <span className="ResponseButton-count">{upvote}</span>
      </div>
    )}
    {downvote > 0 && (
      <div className="ResponseButton-content">
        <DownvoteIcon className="UserRow-voteIcon UserRow-voteIcon--downvote" />
        <span className="ResponseButton-count">{downvote}</span>
      </div>
    )}
  </div>
);

Votes.propTypes = {
  upvote: PropTypes.bool,
  downvote: PropTypes.bool,
  sadvote: PropTypes.bool,
  favorite: PropTypes.bool,
};

export default Votes;
