import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
// import Notifications from '@material-ui/icons/Notifications'

import CustomButton from '../../utils/Button'
import MakeAPost from '../post/MakeAPost'

const styles = theme => ({
    ...theme.group
})

function NavBar(props) {
    const { authenticated, classes } = props
    return (
        <AppBar elevation={0} style={{ backgroundColor: '#FFF', color: 'black' }}>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                        <MakeAPost />
                        <Link to="/">
                            <CustomButton tip="Home">
                                <HomeIcon size="large" style={{ border: '2px solid #2C5364', borderRadius: '50%', padding: 2 }}/>
                            </CustomButton>
                        </Link>
                    </>
                ) : (
                        <>
                            <Button color="inherit" component={Link} className={classes.navButton} to="/login">Login</Button>
                            <Button color="inherit" component={Link} className={classes.navButton} to="/">Home</Button>
                            <Button color="inherit" component={Link} className={classes.navButton} to="/signup">Signup</Button>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    )
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(NavBar))
