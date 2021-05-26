import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid';

import api from '../services/api'

import PostSkeleton from '../utils/PostSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import Navbar from '../components/layout/Navbar'

const styles = (theme) => ({
    ...theme.group,
    spacing: {
        padding: '2rem 4rem',
        ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
            padding: '1rem',
        }
    }
})

function UserScreen(props) {
    const { posts, loading } = props.data
    const { classes } = props

    const [profile, setProfile] = useState(null)
    const [postIdParam, setPostIdParam] = useState(null)

    useEffect(() => {
        const username = props.match.params.username
        const postId = props.match.params.postId

        if (postId) {
            setPostIdParam({ postIdParam: postId })
        }

        props.getUserData(username)
        api.get(`/user/${username}`, {
            headers: {
                Authorization: localStorage.getItem('tokenId')
            }
        })
            .then(res => {
                setProfile(res.data.user)
            })
            .catch(err => {

            })
    }, [])

    const postsMarkup = loading ? (
        <PostSkeleton />
    ) : posts === null ? (
        <p>No posts from this user</p>
    ) : !postIdParam ? (
        posts.map((post) => (
            <Grid item sm={12} xs={12}>
                <Post key={post.postId} post={post} />
            </Grid>
        ))
    ) : (
        posts.map((post) => {
            if (post.postId !== postIdParam)
                return (
                    <Grid item sm={12} xs={12}>
                        <Post key={post.postId} post={post} />
                    </Grid>
                );
            else return <Post key={post.postId} post={post} openDialog />;
        })
    );
    return (
        <div className="mainContainer">
            {profile === null ? (
                <ProfileSkeleton />
            ) : (
                <StaticProfile profile={profile} />
            )}

            <ResponsiveMasonry
                className={classes.spacing}
                style={{ flexGrow: 1 }}
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter={20} style={{ marginTop: '1rem' }}>
                    {postsMarkup}
                </Masonry>
            </ResponsiveMasonry>

            <Navbar />
        </div >
    )
}

UserScreen.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UserScreen))
