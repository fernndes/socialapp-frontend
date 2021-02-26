import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit'

import CustomButton from '../../utils/Button'

const styles = (theme) => ({
    ...theme.group,
    button: {
        float: 'right'
    }
})

function EditDetails(props) {
    const { classes } = props
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const { credentials } = props
        if (credentials.bio) {
            setBio(credentials.bio)
        }
        if (credentials.location) {
            setLocation(credentials.location)
        }

    }, [])

    function handleOpen() {
        setOpen(true)
        const { credentials } = props
        if (credentials.bio) {
            setBio(credentials.bio)
        }
        if (credentials.location) {
            setLocation(credentials.location)
        }
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const userDetails = {
            bio: bio, location: location
        }
        props.editUserDetails(userDetails)

        handleClose()
    }

    return (
        <>
            <CustomButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button}>
                <EditIcon color="primary" />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField name="bio" type="text" label="Bio" multiline rows="2" placeholder="A short bio about yourself" className={classes.textField} value={bio} onChange={(e) => setBio(e.target.value)} fullWidth />
                        <TextField name="location" type="text" label="Location" placeholder="Where you live" className={classes.textField} value={location} onChange={(e) => setLocation(e.target.value)} fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

EditDetails.propTypes = {
    credentials: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))

