import React, { useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { connect } from 'react-redux'
import { getPosts, makeAPost, clearErrors } from '../redux/actions/dataActions'

import Post from '../components/post/Post'
import PostSkeleton from '../utils/PostSkeleton'
import Navbar from '../components/layout/Navbar'

const styles = (theme) => ({
    ...theme.group,
    homeContainer: {
        borderRadius: '1.5rem',
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
    },
    card: {
        margin: '0 1rem 1rem 1rem',
    },
    rounded: {
        borderRadius: 20,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
    },
    textfield: {
        borderBottom: 'none',
        marginBottom: '1rem',
    },
    spacing: {
        padding: '2rem 4rem',
        ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
            padding: '1rem',
        }
    }
})



function HomeScreen(props) {
    const { classes } = props
    const { posts, loading } = props.data

    useEffect(() => {
        props.getPosts()
    }, [])

    let recentPostsMarkup = !loading ? (posts.map((post, key) =>
        <Post post={post} key={post.postId} />
    )) :
        (<PostSkeleton />)

    return (
        <div className="mainContainer">
            <ResponsiveMasonry
                className={classes.spacing}
                style={{ flexGrow: 1 }}
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}

            >
                <Masonry gutter={20} style={{ marginTop: '1rem' }}>
                    {recentPostsMarkup}
                </Masonry>
            </ResponsiveMasonry>
            <Navbar />
        </div >

    )
}

HomeScreen.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    makeAPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    ui: state.ui
})

const mapActionsToProps = {
    getPosts, makeAPost, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HomeScreen))
