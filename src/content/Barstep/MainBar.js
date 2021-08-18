import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Profile from '../../components/Profile';

// Bar
import Baradmin from './Baradmin';
import BarFreeland from './BarFreeland';
import BarEmploy from './BarEmploy';
import Bar from './Bar';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToAppOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getStepContent = (step) => {

    switch (step) {
        case null:
            return (
                <Bar />
            );
        case "Admin":
            return (
                <Baradmin />
            );
        case "Student":
            return (
                <BarFreeland />
            );
        case "Employer":
            return (
                <BarEmploy />
            );
        default:
            return 'ใช่ชื่อ status ผิดน้ะเจ้าบ้า';
    }
}
const logout = () => {
    localStorage.clear();
    window.location.assign("/");

}

const HorizontalLinearStepper = () => {
    const data = {
        status: localStorage.getItem('status'),
    }
    const classes = useStyles();
    const [activeStep] = useState(data.status);
    return (
        <div className={classes.root}>
            { activeStep === null ? (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                </div>
            )
                :
                (
                    <>
                        <Profile />

                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <Divider />
                        <List style={{ marginLeft: '6px' }} >
                            <ListItem button onClick={logout}>
                                <ListItemIcon><ExitToAppOutlined style={{ color: 'orange' }} />
                                </ListItemIcon>
                                <ListItemText primary="ออกจากระบบ" />
                            </ListItem>
                        </List>
                    </>
                )
            }
            <div>
            </div>
        </div>
    );
}
export default HorizontalLinearStepper;
