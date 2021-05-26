import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'

import CustomButton from '../../utils/Button'
import MakeAPost from '../post/MakeAPost'
import Profile from '../profile/Profile'

const styles = theme => ({
    ...theme.group
})

function NavBar(props) {
    const { authenticated, classes } = props
    return (
        <>
            {authenticated ? (
                <div className={classes.verticalMenu}>
                    <Profile />
                    <MakeAPost />
                    <Link to="/">
                        <CustomButton tip="Home">
                            <HomeIcon size="large" />
                        </CustomButton>
                    </Link>
                </div>
            ) : (
                <div className={classes.verticalMenu}>
                    <Button color="inherit" component={Link} className={classes.navButton} to="/login">Login</Button>
                    <Button color="inherit" component={Link} className={classes.navButton} to="/">Home</Button>
                    <Button color="inherit" component={Link} className={classes.navButton} to="/signup">Signup</Button>
                </div>
            )}
        </>
    )
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(NavBar))
