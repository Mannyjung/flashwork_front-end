import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Container, Row, Col } from 'reactstrap';

import '../../css/useraccount.css';
import '../../css/cardhome.css';
import axios from 'axios';
import Api from '../../api/Api';


const ProfileEmpforadmin = ({ id }) => {

    const [showaccount, setShowaccount] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(Api('getEmp') + id, {
        })
            .then((res) => {
                if (isMounted) setShowaccount(res.data[0]);
            })

        return () => { isMounted = false };
    }, [id]);

    return (
        <>
            <Container style={{ marginTop: "5%" }}>
                <Row>
                    <Col sm="3">
                    </Col>
                    <Col sm="6" xs="12">
                        <Card>
                            <br />

                            <CardImg className="imgaccount" top width="100%" height="300px" src={showaccount.em_image} />
                            <CardBody>
                                <CardTitle tag="h5"><b>แนะนำตัวเอง</b></CardTitle>
                                <br />
                                <CardText>
                                    ชื่อ - นามสกุล : {showaccount.em_fname} {showaccount.em_lname} <br />
                                    <hr />

                                            อีเมลล์ : {showaccount.em_email}<br />
                                    <hr />

                                            เบอร์โทรศัพท์ติดต่อ : {showaccount.em_phone}<br />

                                </CardText>

                            </CardBody>
                            <br />
                        </Card>
                        <br /> <br /> <br />
                    </Col>
                    {/* --------------------------------------- card 1 ------------------------------------------------------- */}
                    <Col sm="3">
                    </Col>
                    
                </Row>
                <br />
            </Container>

        </>
    )
}

export default ProfileEmpforadmin
