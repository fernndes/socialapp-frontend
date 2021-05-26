import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

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

        setErrors({})
        props.signupUser(data, history)
    }

    useEffect(() => {
        setErrors(props.ui.errors)
    }, [props.ui.errors])

    return (
        <Grid container className={classes.form}>
            <Grid item xs={false} sm={4} md={7} className={classes.imageBanner} />
            <Grid item xs={12} sm={8} md={5} className={classes.container}>
                <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Bubble</h1>
                <form onSubmit={handleSubmit}>
                    <TextField id="email" name="email" type="email" label="E-mail" className={classes.textField} value={email} onChange={(event) => setEmail(event.target.value)} helperText={errors && (errors.email || errors.error) ? (errors.error ? errors.error : errors.email.text) : void (0)} error={errors && (errors.email || errors.error) ? true : false} fullWidth required={true} autoComplete="off" inputProps={{ minLength: 1 }} />
                    <TextField id="password" name="password" type="password" label="Senha" className={classes.textField} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth required helperText={errors && errors.password ? errors.password.text : void (0)} error={errors && errors.password ? true : false} autoComplete="off" inputProps={{ minLength: 8, maxLength: 30 }} />
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirme sua senha" className={classes.textField} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} fullWidth required helperText={errors && errors.confirmPassword ? errors.confirmPassword.text : void (0)} error={errors && errors.confirmPassword ? true : false} autoComplete="off" inputProps={{ minLength: 8, maxLength: 30 }} />
                    <TextField id="username" name="username" type="username" label="Nome de usuário" className={classes.textField} value={username} onChange={(event) => setUsername(event.target.value)} fullWidth required helperText={errors && errors.username ? (errors.username.text || errors.username) : void (0)} error={errors && errors.username ? true : false} autoComplete="off" inputProps={{ minLength: 6, maxLength: 12 }} />
                    {!loading ? (
                        <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth disabled={loading}>Cadastre-se</Button>
                    ) : (
                        <CircularProgress />
                    )}
                </form>
                <p className={classes.newAccount}><Link to="/login">Já tem uma conta? Acesse</Link> </p>
            </Grid>
            <Grid item sm />
        </Grid >
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