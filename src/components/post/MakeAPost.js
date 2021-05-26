import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { makeAPost, clearErrors } from '../../redux/actions/dataActions'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import CustomButton from '../../utils/Button'

const styles = (theme) => ({
    ...theme.group,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 40
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})


function MakeAPost(props) {
    const { classes, ui: { loading } } = props
    const [open, setOpen] = useState(false)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (props.ui.errors) {
            setErrors(props.ui.errors)
        }
        if (!props.ui.errors && !props.ui.loading) {
            setBody('')
            setOpen(false)
            setErrors({})
        }
    }, [props.ui.errors])

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        setErrors({})
        props.clearErrors()
    }

    function handleSubmit(e) {
        e.preventDefault()

        const newPost = {
            body
        }

        props.makeAPost(newPost)

        setBody('')
        handleClose()

    }

    return (
        <>
            <CustomButton tip="Faça uma postagem" onClick={handleOpen}>
                <AddIcon size="large" style={{ margin: '2rem 0' }} />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <CustomButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </CustomButton>
                <DialogTitle>Faça uma postagem</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name="body" type="text" label="Escreva algo..." multiline rows="2" placeholder="..." className={classes.textField} value={body} fullWidth helperText={errors && errors.validation && errors.validation.body && errors.validation.body.message} error={errors && errors.validation ? true : false} onChange={(event) => setBody(event.target.value)} fullWidth inputProps={{ minLength: 12 }} required={true} />
                        {!loading ? (
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} fullWidth disabled={loading}>ENVIAR</Button>
                        ) : (
                            <CircularProgress size={30} />
                        )}

                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

MakeAPost.propTypes = {
    classes: PropTypes.object.isRequired,
    makeAPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

const mapActionsToProps = {
    makeAPost, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MakeAPost))
