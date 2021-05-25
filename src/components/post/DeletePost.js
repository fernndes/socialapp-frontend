import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { deletePost } from "../../redux/actions/dataActions";

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteOutline from '@material-ui/icons/DeleteOutline'

import CustomButton from '../../utils/Button'

const styles = {
    deleteButton: {
        margin: 0,
        padding: 0,
        marginRight: 0
    }
}

function DeletePost(props) {
    const { classes, postId } = props
    const [open, setOpen] = useState(false)

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function deletePost() {
        props.deletePost(postId)
        setOpen(false)
    }

    return (
        <>
            <CustomButton tip="Delete post" onClick={handleOpen} btnClassName={classes.deleteButton}>
                <DeleteOutline color="primary" />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deletePost} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {
    deletePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DeletePost))
