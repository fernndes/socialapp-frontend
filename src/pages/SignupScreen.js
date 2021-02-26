import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const styles = (theme) => ({
    ...theme.group
})

function SignupScreen(props) {
    const { classes, ui: { loading } } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState({})

    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            username: username
        }

        props.signupUser(data, history)
    }

    useEffect(() => {
        setErrors(props.ui.errors)
    }, [props.ui.errors])

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm className={classes.container}>
                <AssignmentIndIcon className={classes.logo} color="primary"/>
                <Typography variant="h5" className={classes.pageTitle}>
                    Sign up for free
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={email} onChange={(event) => setEmail(event.target.value)} helperText={(errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "email") && errors.validation.body.message) || (errors && errors.error)} error={(errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "email")) || (errors && errors.error) ? true : false} fullWidth required variant="outlined" autoComplete="off" />
                    <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth required variant="outlined" helperText={errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "password") &&errors.validation.body.message} error={errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "password") ? true : false} autoComplete="off" />
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm your password" className={classes.textField} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} fullWidth required variant="outlined" helperText={errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "confirmPassword") && 'Passwords should be equals'} error={errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "confirmPassword") ? true : false} autoComplete="off" />
                    <TextField id="username" name="username" type="username" label="Username" className={classes.textField} value={username} onChange={(event) => setUsername(event.target.value)} fullWidth required variant="outlined" helperText={errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "username") && errors.validation.body.message} error={errors && errors.validation && errors.validation.body && (errors.validation.body.keys == "username") ? true : false} autoComplete="off" />
                    {!loading ? (
                        <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth disabled={loading}>Signup</Button>
                    ) : (
                            <CircularProgress />
                        )}
                </form>
                <p className={classes.newAccount}><Link to="/login">Already have an account? Log in </Link> </p>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

SignupScreen.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignupScreen))