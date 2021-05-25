export default {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Quicksand',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
  palette: {
    primary: {
      light: '#6060d0', //
      main: '#6060d0',
      dark: '#6060d0',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#f5f5f5',
      main: '#f5f5f5',
      dark: '#f5f5f5',
      contrastText: '#000'
    }
  },
  group: {
    paddingContainer: {
      padding: '7rem 5rem',
      ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
        padding: '1rem',
      }
    },
    bgLight: {
      background: '#cdcdff'
    },
    borderRad: {
      borderRadius: '20px'
    },
    navButton: {
      paddingRight: 20,
      paddingLeft: 20
    },
    resetPadding: {
      margin: 0,
      padding: 0
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFF',
      padding: '3rem 5rem',
      ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
        padding: '1rem'
      }
    },
    form: {
      flexGrow: 1
    },
    imageBanner: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    image: {
      margin: '20px auto 20px auto'
    },
    logo: {
      fontSize: 40,
      marginTop: 40,
      border: '2px solid #2C5364',
      borderRadius: '50%',
      padding: 20
    },
    pageTitle: {
      margin: '20px auto 20px auto'
    },
    textField: {
      margin: '20px auto 0px auto'
    },
    button: {
      marginTop: 40,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    paper: {
      padding: 20
    },
    verticalMenu: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      padding: '2rem 3rem',
      backgroundColor: '#fff',
      ['@media (max-width: 850px)']: { // eslint-disable-line no-useless-computed-key
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        padding: '0rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        borderBottom: '1px solid #919191'
      }
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#2C5364'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
};
