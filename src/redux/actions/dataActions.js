import { SET_POSTS, CLEAR_ERRORS, STOP_LOADING_UI, LOADING_DATA, DELETE_POST, SET_AUTHENTICATED, LIKE_POST, UNLIKE_POST, LOADING_UI, SUBMIT_COMMENT, MAKE_POST, SET_ERRORS, SET_POST } from '../types'
import api from '../../services/api'

export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    api.get('/posts', {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    }).then(res => {
        dispatch({
            type: SET_POSTS,
            payload: res.data
        })
    })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

export const likePost = (postId) => dispatch => {
    api.get(`/post/${postId}/like`, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const unlikePost = (postId) => dispatch => {
    api.get(`/post/${postId}/unlike`, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePost = (postId) => dispatch => {
    api.delete(`/post/${postId}`, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const makeAPost = (newPost) => dispatch => {
    dispatch({ type: LOADING_UI })
    api.post('/post', newPost, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: MAKE_POST,
                payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const getPost = (postId) => dispatch => {
    dispatch({ type: LOADING_UI })
    api.get(`/post/${postId}`, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const submitComment = (postId, commentData) => dispatch => {
    api.post(`/post/${postId}/comment`, commentData, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = username => dispatch => {
    dispatch({
        type: LOADING_DATA
    })
    api.get(`/user/${username}`, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data.posts
            })
        })
        .catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null
            })
        })
}