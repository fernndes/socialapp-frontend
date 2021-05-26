import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.group,
    rounded: {
        borderRadius: 20
    }
})

function LoginScreen(props) {
    const { classes, ui: { loading } } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    let customStyle = [classes.form].join(' ')

    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            email: email,
            password: password
        }
        setErrors({})
        props.loginUser(data, history)
    }

    useEffect(() => {
        setErrors({})
        setErrors(props.ui.errors)
    }, [props.ui.errors])

    return (
        <Grid container className={customStyle}>
            <Grid item xs={false} sm={4} md={7} className={classes.imageBanner} />
            <Grid item xs={12} sm={8} md={5} className={classes.container}>
                <h1 className="text-gradient">Bubble</h1>
                <form onSubmit={handleSubmit}>
                    <TextField id="email" name="email" type="email" label="E-mail" className={classes.textField} value={email} onChange={(event) => setEmail(event.target.value)} fullWidth helperText={(errors && errors.validation) || (errors && errors.general) ? 'Email or password is wrong, please try again' : void (0)} error={(errors && errors.validation) || (errors && errors.general) ? true : false} autoComplete="off" inputProps={{ minLength: 4 }} required={true} />
                    <TextField id="password" name="password" type="password" label="Senha" className={classes.textField} value={password} onChange={(event) => setPassword(event.target.value)} helperText={(errors && errors.validation) || (errors && errors.general) ? 'Email or password is wrong, please try again' : void (0)} error={(errors && errors.validation) || (errors && errors.general) ? true : false} fullWidth autoComplete="off" inputProps={{ minLength: 8, maxLength: 30 }} required={true} />
                    {!loading ? (
                        <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth disabled={loading}>Entrar</Button>
                    ) : (
                        <CircularProgress style={{ marginTop: 20 }} />
                    )}
                </form>
                <p className={classes.newAccount}><Link to="/signup">Ainda não tem uma conta? Cadastre-se</Link> </p>
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