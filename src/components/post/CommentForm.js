import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.group
});

function CommentForm(props) {
  const { classes, authenticated } = props;

  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (props.ui.errors) {
      setErrors({ errors: props.ui.errors })
    }
    if (!props.ui.errors && !props.ui.loading) {
      setBody('')
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    props.submitComment(props.postId, { body })
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'right' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Faça um comentário"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={e => setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Enviar
            </Button>
      </form>
      <hr className={classes.invisibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  submitComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
