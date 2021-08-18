import { Grid, makeStyles } from '@material-ui/core'

import React from 'react'
import Selectpost from '../content/selectpost/Contpost'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Selpost = (props) => {
    const classes = useStyles();

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <div className={classes.root}>

                <Grid container >
                    <Grid xs={12} sm={12}>

                        <Selectpost id={props.match.params.id} />


                    </Grid>

                </Grid>

            </div>
        </>
    )}
}

export default Selpost
