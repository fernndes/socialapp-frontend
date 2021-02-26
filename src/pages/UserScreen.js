import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import api from '../services/api'

import PostSkeleton from '../utils/PostSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

function UserScreen(props) {
    const { posts, loading } = props.data

    const [profile, setProfile] = useState(null)
    const [postIdParam, setPostIdParam] = useState(null)

    useEffect(() => {
        const username = props.match.params.username
        const postId = props.match.params.postId
        
        if(postId) {
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
            console.log(err)
        })
    }, [])

    const postsMarkup = loading ? (
        <PostSkeleton />
    ) : posts === null ? (
        <p>No posts from this user</p>
    ) : !postIdParam ? (
        posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
                    posts.map((post) => {
                        if (post.postId !== postIdParam)
                            return <Post key={post.postId} post={post} />;
                        else return <Post key={post.postId} post={post} openDialog />;
                    })
                );
    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {postsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {profile === null ? (
                    <ProfileSkeleton />
                ) : (
                        <StaticProfile profile={profile} />
                    )}
            </Grid>
        </Grid>
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

export default connect(mapStateToProps, mapActionsToProps)(UserScreen);
