import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import jwtDecode from 'jwt-decode'
import axios from 'axios';

import Navbar from './components/layout/Navbar'
import AuthRoute from './utils/AuthRoute'

import HomeScreen from '../src/pages/HomeScreen'
import LoginScreen from '../src/pages/LoginScreen'
import SignupScreen from '../src/pages/SignupScreen'
import UserScreen from '../src/pages/UserScreen'

import { Provider } from 'react-redux'
import store from '../src/redux/store'
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions'


const token = localStorage.tokenId

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function Routes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/login" component={LoginScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/users/:username" component={UserScreen} />
          <AuthRoute path="/signup" component={SignupScreen} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default Routes