import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { uploadImage, logoutUser } from '../../redux/actions/userActions'

import EditDetails from './EditDetails'

import LocationOn from '@material-ui/icons/LocationOn'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import CustomButton from '../../utils/Button'

const styles = (theme) => ({
    ...theme.group
})

function Profile(props) {
    const { classes, user: { credentials: { username, createdAt, imageUrl, bio, location }, loading, authenticated } } = props
    function handleImageChange(event) {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('file', image)
        props.uploadImage(formData)
    }
    function handleEditPicture() {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    function handleLogout() {
        props.logoutUser()
    }
    let profileMarkup = !loading ? (
        authenticated ? (
            <Paper className={classes.paper}>
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
                    {/* <Tooltip title="Logout" placement="top">
                        <IconButton onClick={handleLogout}>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </Tooltip> */}
                    <CustomButton tip="Logout" onClick={handleLogout}>
                        <KeyboardReturn color="primary" />
                    </CustomButton>
                    <EditDetails />
                </div>
            </Paper>
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
