import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

import AppIcon from '../assets/images/elephant.png'

import LockOpen from '@material-ui/icons/LockOpen'

const styles = (theme) => ({
    ...theme.group
})

function LoginScreen(props) {
    const { classes, ui: { loading } } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            email: email,
            password: password
        }

        let errorsFields = validateField(data)

        if(Object.keys(errorsFields).length === 0) {
            props.loginUser(data, history)
        }      
    }

    useEffect(() => {
        setErrors([])
        setErrors(props.ui.loginErrors)
    }, [props.ui.loginErrors])

    function validateField(data) {
        let fieldErrors = {};
        if(data.password.length < 8 || data.password.length > 30) {
            fieldErrors['password'] = { field: 'password', text: 'Field should have a minimum length of 8 and max of 30' }
        }
        if(data.email.length < 1) {
            fieldErrors['email'] = { field: 'email', text: 'Field should not be empty' }
        }
        return fieldErrors
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm className={classes.container}>
                <LockOpen className={classes.logo} color="primary" />
                <Typography variant="h5" className={classes.pageTitle}>
                    Log in to your account
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id="email" name="email" type="email" variant="outlined" label="Email" className={classes.textField} value={email} onChange={(event) => setEmail(event.target.value)} fullWidth helperText={ (errors && errors.validation) || (errors && errors.general) ? 'Email or password is wrong, please try again' : void (0)} error={(errors && errors.validation) || (errors && errors.general) ? true : false} autoComplete="off" inputProps={{ minLength: 1 }} />
                    <TextField id="password" name="password" type="password" variant="outlined" label="Password" className={classes.textField} value={password} onChange={(event) => setPassword(event.target.value)} helperText={(errors && errors.validation) || (errors && errors.general) ? 'Email or password is wrong, please try again' : void (0)} error={(errors && errors.validation) || (errors && errors.general) ? true : false} fullWidth autoComplete="off" inputProps={{ minLength: 8, maxLength: 30 }}/>
                    {!loading ? (
                        <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth disabled={loading}>Login</Button>
                    ) : (
                            <CircularProgress />
                        )}
                </form>
                <p className={classes.newAccount}><Link to="/signup">Don't have an account? Sign up</Link> </p>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

LoginScreen.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginScreen))