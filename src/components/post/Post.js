import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'

import CustomButton from '../../utils/Button'
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'
import LikeButton from './LikeButton'

const styles = {
    card: {
        display: 'flex',
        position: 'relative',
        marginBottom: 20,
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

function Post(props) {
    dayjs.extend(relativeTime)
    const { classes, post: { body, createdAt, userImg, username, likeCount, postId, commentCount }, user: { authenticated } }  = props

    const deleteButton = (authenticated && props.user.credentials.username === username) ? (
        <DeletePost postId={postId}/>
    ) : (null)

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImg}
                title="Profile image"
            />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${username}`} color="textPrimary">{username}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton postId={postId}/>
                <span>{likeCount} Likes</span>
                <CustomButton tip="comments">
                    <ChatIcon color="primary" />
                </CustomButton>
                <span>{commentCount} comments</span>
                <PostDialog postId={postId} userName={props.user.credentials.username}/>
            </CardContent>
        </Card>
    )
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post))
