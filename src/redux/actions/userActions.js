import axios from 'axios'
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED, SET_LOGIN_ERRORS } from '../types'

import api from '../../services/api'

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    api.post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({
                type: CLEAR_ERRORS
            })
            history.push('/')
        })
        .catch((error) => {
            dispatch({
                type: SET_LOGIN_ERRORS,
                payload: error.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    api.get('/user', {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    api.post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({
                type: CLEAR_ERRORS
            })
            history.push('/')
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('tokenId');
    delete axios.defaults.headers.common['Authorization']
    dispatch({
        type: SET_UNAUTHENTICATED
    })
}

const setAuthorizationHeader = (token) => {    
    localStorage.setItem('tokenId', `Bearer ${token}`)
    axios.defaults.headers.common['Authorization'] = token
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    api.post('/upload', formData, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => {
            
        })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    api.post('/user', userDetails, {
        headers: {
            Authorization: localStorage.getItem('tokenId')
        }
    })
        .then(res => {
            dispatch(getUserData())
        })
        .catch(err => {
            
        })
}