import React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import Routes from './routes'

import { Provider } from 'react-redux'
import store from '../src/redux/store'

import themeObj from '../src/utils/theme'

const theme = createMuiTheme({
  ...themeObj,
  overrides: {
    MuiInput: {
      underline: {
        '&:hover:not($disabled):before': {
          borderBottom: '1px solid #6060d0'
        },
      },
    },
  },
})

export default function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </MuiThemeProvider>
    </div>
  )
}

