import React, { useEffect, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { connect } from 'react-redux'
import { getPosts, makeAPost, clearErrors } from '../redux/actions/dataActions'

import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
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
    let customStyle = [classes.form, classes.rounded].join(' ')
    const { posts, loading } = props.data
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (props.ui.errors) {
            setErrors(props.ui.errors)
        }
        if (!props.ui.errors && !props.ui.loading) {
            setBody('')
            setErrors({})
        }
    }, [props.ui.errors])

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
