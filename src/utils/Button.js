import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

function Button({ children, onClick, btnClassName, tipClassName, tip }) {
    return (
        <Tooltip title={tip} className={tipClassName} style={{ padding: 0, margin: 0 }}>
            <IconButton onClick={onClick} style={{ padding: 0, margin: 0 }} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

export default Button
