import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'

import CustomButton from '../../utils/Button'
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'
import LikeButton from './LikeButton'

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        textAlign: 'left'
    },
    avatar: {
        height: '3rem',
        width: '3rem',
        borderRadius: '50%',
        resizeMode: 'cover'
    },
    action: {
        margin: 0,
        padding: 0,
        alignSelf: 'center'
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem'
    },
    like: {
        marginRight: 20
    },
    rounded: {
        borderRadius: 20,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}

function Post(props) {
    dayjs.extend(relativeTime)
    const { classes, post: { body, createdAt, userImg, username, likeCount, postId, commentCount }, user: { authenticated } } = props

    const deleteButton = (authenticated && props.user.credentials.username === username) ? (
        <DeletePost postId={postId} />
    ) : (null)

    return (
        <Card className={classes.card}>
            <CardHeader
                classes={{
                    action: classes.action
                }}
                avatar={
                    <img className={classes.avatar} src={userImg} alt="user_image" />
                }
                action={deleteButton}

                title={
                    <Typography variant="h5" component={Link} to={`/users/${username}`} color="textPrimary">{username}</Typography>
                }
                subheader={<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>}

            />
            <CardContent className={classes.content}>
                <Typography variant="body1">{body}</Typography>
                <div className={classes.bottom}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '0.75rem' }}>
                            <LikeButton postId={postId} btnClassName={classes.like} />
                            <span style={{ marginLeft: 10 }}>{likeCount} Likes</span>
                        </div>
                        <div>
                            <CustomButton tip="comments">
                                <ChatIcon color="primary" />
                            </CustomButton>
                            <span style={{ marginLeft: 10 }}>{commentCount} comentários</span>
                        </div>
                    </div>
                    <PostDialog postId={postId} userName={props.user.credentials.username} />
                </div>
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
