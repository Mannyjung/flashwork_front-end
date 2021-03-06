import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Label } from 'reactstrap';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
    ,
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

export default function BadgeAvatars() {
    const userdata = localStorage.getItem('User_id')

    const img = localStorage.getItem('image')

    let $data = "Please Login"
    if (userdata != null) {
        $data = userdata
    }
    else {
        $data = "Please Login"
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Avatar alt="Remy Sharp" src={img} className={classes.large} />
            </StyledBadge>
            <div style={{ marginLeft: '20px' }}>

                <Label id="user" style={{ marginTop: "30%" }}>{$data}</Label>
                <br />
            </div>

        </div>
    );
}
