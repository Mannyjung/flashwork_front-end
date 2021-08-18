import { Grid, makeStyles } from '@material-ui/core'

import React from 'react'
import HeadPost from '../content/selectpost/HeadPost';

import ParsonalFreeland from '../content/selectpost/ParsonalFreeland';
import Review from '../content/selectpost/Review';
import CarluselPost from '../content/selectpost/CarluselPost';
import Selecpackage from '../content/selectpost/Selecpackage';
import { Col, Row } from 'reactstrap';

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
const Selectpost = (props) => {
    const classes = useStyles();

//     if (localStorage.getItem('User_id') == null) {

      
//         window.location.assign("/login2")

   
// }
// else {
    return (
        <>
            <div className={classes.root}>

                <Grid container >
                    <Grid >

                        <Row>
                            <Col sm={7}>
                                <HeadPost  id={props.match.params.id}/>
                            </Col>
                            <Col sm={5}>
                                <CarluselPost  id={props.match.params.id}/>
                            </Col>
                            <Col sm={12}>
                                <Selecpackage  id={props.match.params.id}/>
                            </Col>
                          
                            <Col sm={10}>
                                <ParsonalFreeland id={props.match.params.id} />
                            </Col>
                            <Col sm={12}>
                                <Review  id={props.match.params.id}/>
                            </Col>
                        </Row>


                    </Grid>

                </Grid>

            </div>
        </>
    )
}

export default Selectpost
