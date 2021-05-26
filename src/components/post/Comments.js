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
    ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    }
  },
  spacing: {
    padding: '0rem 0.75rem 2rem 0.75rem',
    ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
      padding: 0,
      paddingBottom: '2rem'
    }
  },
  item: {
    paddingRight: 20,
    ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
      padding: 0
    }
  }
});

function Comments(props) {
  const { comments, classes } = props

  return (
    <Grid container className={classes.spacing}>
      {comments.map((comment, index) => {
        const { body, createdAt, userImg, username } = comment;
        return (
          <Grid item sm={12} xs={12} key={createdAt}>
            <Grid container style={{ alignItems: 'center' }}>
              <Grid item xs={0} sm={3} className={classes.item}>
                <img
                  src={userImg}
                  alt="comment"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item xs={12} sm={9} className={classes.commentData} classes={{
                root: classes.item
              }}>
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
