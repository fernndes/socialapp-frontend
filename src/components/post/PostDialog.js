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
        margin: '1.5rem'
    },
    profileImage: {
        maxWidth: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none'
        }
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        alignSelf: 'flex-end'
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
    },
    bottom: {
        display: 'flex',
        marginTop: '1.5rem'
    },
    head: {
        marginBottom: '1.5rem'
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
            <CircularProgress size={50} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={3}>
            <Grid item sm={5}>
                <img src={userImg} alt="Profile" className={classes.profileImage} />
            </Grid>
            <Grid item sm={7} xs={12}>
                <div className={classes.head}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${username}`}>
                        @{username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                </div>
                <Typography variant="body1">
                    {body}
                </Typography>
                <div className={classes.bottom}>
                    <div style={{ marginRight: '0.75rem' }}>
                        <LikeButton postId={postId} />
                        <span style={{ marginLeft: 10 }}>{likeCount}</span>
                    </div>
                    <div>
                        <CustomButton tip="comments">
                            <ChatIcon color="primary" />
                        </CustomButton>
                        <span style={{ marginLeft: 10 }}>{commentCount}</span>
                    </div>
                </div>
            </Grid>
            <CommentForm postId={postId} />
            <hr className={classes.invisibleSeparator} />
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
                    <CloseIcon style={{ margin: '0.5rem' }} />
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
