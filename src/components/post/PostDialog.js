import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getPost, clearErrors } from '../../redux/actions/dataActions'

import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'

import CustomButton from '../../utils/Button'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

const styles = (theme) => ({
    ...theme.group,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '6%'
    },
    expandButton: {
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    chat: {
        marginRight: '0.75rem'
    }
})


function PostDialog(props) {
    const { classes, ui: { loading }, post: { postId, body, createdAt, likeCount, commentCount, userImg, username, comments } } = props
    const [open, setOpen] = useState(false)

    function handleOpen() {
        setOpen(true)
        props.getPost(props.postId)
    }

    function handleClose() {
        setOpen(false)
        props.clearErrors()
    }

    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={100} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={12}>
            <Grid item sm={5}>
                <img src={userImg} alt="Profile" className={classes.profileImage} />
            </Grid>
            <Grid item sm={7}>
                <Typography component={Link} color="primary" variant="h5" to={`/users/${username}`}>
                    @{username}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">
                    {body}
                </Typography>
                <LikeButton postId={postId} />
                <span>{likeCount} Likes</span>
                <CustomButton tip="comments">
                    <ChatIcon color="primary" />
                </CustomButton>
                <span>{commentCount} comments</span>
            </Grid>
            <hr className={classes.invisibleSeparator} />
            <CommentForm postId={postId} />
            <Comments comments={comments} />
        </Grid>
    )

    return (
        <>
            <CustomButton tip="Expand post" tipClassName={classes.expandButton} onClick={handleOpen}>
                <UnfoldMore color="primary" />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <CustomButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </CustomButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </>
    )
}

PostDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    post: state.data.post
})

const mapActionsToProps = {
    getPost, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))
