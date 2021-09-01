import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card, Container, Row, Col, CardImg, CardBody, CardText, Label
} from 'reactstrap';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Api from '../api/Api';

const Showsearchwork = ({ id }) => {
    const [showworkbysearch, setShowworkbysearch] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(Api('search') + id)
            .then((response) => {
                if (isMounted) setShowworkbysearch(response.data);
            });
        return () => { isMounted = false };
    }, [id]);

    console.log(showworkbysearch)
    return (
        <>


            <Container style={{ marginTop: "5%" }}>

                <h1>ผลจากการค้นหา <b style={{ color: "orange" }}>"{id}"</b></h1><br />


                {showworkbysearch == '' ?
                    <Label style={{fontSize:"1rem"}}>ไม่พบการค้นหาจากคำดังกล่าว</Label>
                    :
                    (<>
                        {showworkbysearch.map((searchwork) => {
                            return (
                                <>


                                    <Col sm="4">
                                        <a className="linkwork" href={"/SelectPost/" + searchwork.aw_id} >
                                            <Card className="cardw">
                                                <CardHeader
                                                    avatar={
                                                        <Avatar alt="Travis Howard"
                                                            src={searchwork.std_image} />
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    title={searchwork.std_fname}
                                                    subheader={searchwork.aw_std_id}


                                                />
                                                <CardImg className="imgwork" src={searchwork.w_img_name} alt="Card image cap" />
                                                <CardBody className="body-name">
                                                    <Row >
                                                        <Col sm="6" className="cwc11">
                                                            <b><CardText>{searchwork.aw_name}</CardText></b>
                                                        </Col>
                                                        <Col sm="6" className="cwc11">
                                                            <CardText>ราคาเริ่มต้น {searchwork.pk_price} &nbsp; {searchwork.pk_time_period}</CardText>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </a>
                                        <br /><p></p>
                                    </Col>




                                </>
                            )
                        })}
                    </>)
                }



            </Container>
        </>
    )
}

export default Showsearchwork
