import React, { useEffect } from 'react'

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.group,
  commentImage: {
    maxWidth: '100%',
    objectFit: 'contain',
    borderRadius: '50%',
  },
  commentData: {
  }
});

function Comments(props) {
  const { comments, classes } = props

  return (
    <Grid container style={{ padding: '0rem 0.75rem 2rem 0.75rem' }}>
      {comments.map((comment, index) => {
        const { body, createdAt, userImg, username } = comment;
        return (
          <Grid item sm={12} xs={12} key={createdAt}>
            <Grid container spacing={3} style={{ alignItems: 'center' }}>
              <Grid item xs={3}>
                <img
                  src={userImg}
                  alt="comment"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item xs={9} className={classes.commentData}>
                <Typography
                  variant="h5"
                  component={Link}
                  to={`/users/${username}`}
                  color="primary"
                >
                  {username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variabnt="body1">{body}</Typography>
              </Grid>
            </Grid>
            {
              index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )
            }
          </Grid>
        );
      })}
    </Grid >
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
