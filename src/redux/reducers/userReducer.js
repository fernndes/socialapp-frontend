import { SET_USER, LIKE_POST, UNLIKE_POST, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types'

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload,
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.payload.postId)
            }
        default:
            return state
    }
}