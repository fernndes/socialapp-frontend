import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { likePost, unlikePost } from "../../redux/actions/dataActions";

import withStyles from '@material-ui/core/styles/withStyles'

import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import CustomButton from '../../utils/Button'

const styles = (theme) => ({
    ...theme.group
})

function LikeButton(props) {
    const { classes, user: { authenticated } }  = props

    function likedPost() {
        if (props.user.likes && props.user.likes.find(like => like.postId === props.postId)) {
            return true
        } else {
            return false
        }
    }

    function likePost() {
        props.likePost(props.postId)
    }

    function unlikePost() {
        props.unlikePost(props.postId)
    }

    const likeButton = !authenticated ? (
        <Link to="/login">
            <CustomButton tip="Like">            
                <FavoriteBorder color="primary" />            
            </CustomButton>
        </Link>
    ) : (
            likedPost() ? (
                <CustomButton tip="Undo like" onClick={unlikePost}>
                    <FavoriteIcon color="primary" />
                </CustomButton>
            ) : (
                    <CustomButton tip="Like" onClick={likePost}>
                        <FavoriteBorder color="primary" />
                    </CustomButton>
                )
        )
    return likeButton
}

LikeButton.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost, unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton))
