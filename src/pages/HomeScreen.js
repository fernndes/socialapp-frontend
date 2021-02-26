import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid"

import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'

import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
import PostSkeleton from '../utils/PostSkeleton'

function HomeScreen(props) {
    const { posts, loading } = props.data

    useEffect(() => {
        props.getPosts()
    }, [])

    let recentPostsMarkup = !loading ? (posts.map((post, key) => <Post post={post} key={post.postId}/>)) : (<PostSkeleton/>)

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {recentPostsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
        </Grid>
    )
}

HomeScreen.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen)
