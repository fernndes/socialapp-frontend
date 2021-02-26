export default {
  palette: {
    primary: {
      light: '#2C5364', //
      main: '#2C5364',
      dark: '#2C5364',
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
    typography: {
      useNextVariants: true
    },
    navButton: {
      paddingRight: 20,
      paddingLeft: 20
    },
    container: {
      backgroundColor: '#FFF',
      borderRadius: 20,
      padding: '20px 40px 20px 40px'
    },
    form: {
      textAlign: 'center'
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
