import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { uploadImage, logoutUser } from '../../redux/actions/userActions'

import EditDetails from './EditDetails'

import LocationOn from '@material-ui/icons/LocationOn'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import CalendarToday from '@material-ui/icons/CalendarToday'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import Avatar from '@material-ui/core/Avatar'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close'

import CustomButton from '../../utils/Button'

const styles = (theme) => ({
    ...theme.group,
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2rem'
    },
    rounded: {
        borderRadius: 20,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)'
    },
    closeButton: {
        alignSelf: 'flex-end'
    }
})

function Profile(props) {
    const { classes, user: { credentials: { username, createdAt, imageUrl, bio, location }, loading, authenticated } } = props
    const [open, setOpen] = useState(false)

    function handleOpen() {
        setOpen(true)
    }

    function handleImageChange(event) {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('file', image)
        props.uploadImage(formData)
        handleClose()
    }
    function handleEditPicture() {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
        handleClose()
    }
    function handleLogout() {
        props.logoutUser()
        handleClose()
    }
    function handleClose() {
        setOpen(false)
    }
    let profileMarkup = !loading ? (
        authenticated ? (
            <>
                <CustomButton tip="Profile" onClick={handleOpen}>
                    <Avatar alt="Profile" src={imageUrl} />
                </CustomButton>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon style={{ margin: '0.5rem' }} />
                    </CustomButton>
                    <DialogContent style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                        <div className={classes.paper} classes={{
                            root: classes.rounded
                        }}>
                            <div className={classes.profile}>
                                <div className="image-wrapper">
                                    <img src={imageUrl} alt="profile" className="profile-image" />
                                    <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
                                    <CustomButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                                        <CameraIcon color="primary" />
                                    </CustomButton>
                                </div>
                                <hr />
                                <div className="profile-details">
                                    <MuiLink component={Link} to={`/users/${username}`} color="primary" variant="h5">
                                        @{username}
                                    </MuiLink>
                                    <hr />
                                    {bio && <Typography variant="body2">{bio}</Typography>}
                                    <hr />
                                    {location && (
                                        <>
                                            <LocationOn color="primary" /> <span>{location}</span>
                                            <hr />
                                        </>
                                    )}
                                    <CalendarToday color="primary" />{' '}
                                    <span>Joined {dayjs(createdAt).format('YYYY-MM-DD')}</span>
                                </div>
                                <div className={classes.footer}>
                                    <CustomButton tip="Logout" onClick={handleLogout}>
                                        <KeyboardReturn color="primary" />
                                    </CustomButton>
                                    <EditDetails />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again...
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )
    ) : (
        <p>loading...</p>
    )
    return profileMarkup
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    logoutUser, uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
