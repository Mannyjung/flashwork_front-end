import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Container, Row, Col } from 'reactstrap';
import '../../css/useraccount.css';
import '../../css/cardhome.css';
import axios from 'axios';
import Api from '../../api/Api';


const ProfileFreeforadmin = ({ id }) => {

    const [showaccount, setShowaccount] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(Api('getStudent') + id, {
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

                    <Col sm="6">
                        <Card>
                            <br />

                            <CardImg className="imgaccount" top width="100%" height="300px" src={showaccount.std_image} />
                            <CardBody>
                                <CardTitle tag="h5"><b>แนะนำตัวเอง</b></CardTitle>
                                <br />
                                <CardText>
                                    ชื่อ - นามสกุล : {showaccount.std_fname} {showaccount.std_lname} <br />
                                    <hr />

                                            อีเมลล์ : {showaccount.std_email}<br />
                                    <hr />

                                            เบอร์โทรศัพท์ติดต่อ : {showaccount.std_phone}<br />

                                </CardText>

                            </CardBody>
                            <br />
                        </Card>
                        <br /> <br /> <br />
                    </Col>
                    {/* --------------------------------------- card 1 ------------------------------------------------------- */}

                    <Col sm="6">
                        <Card>
                            <CardBody>
                            <CardTitle tag="h5"><b>กำลังศึกษาอยู่</b></CardTitle>
                                <CardText>
                                     <p style={{ fontSize: 16 }} className="mt-3">   {showaccount.fac_name}</p>
                                     
                                   <p style={{ fontSize: 16 }}> {showaccount.major_name}</p> 

                                </CardText>
                            </CardBody>
                        </Card>
                      
                        <br />
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5"><b>คำอธิบาย</b></CardTitle>
                                <p style={{ fontSize: 16 }}>{showaccount.std_description}</p> 

                            </CardBody>
                        </Card> 
                    </Col>
                </Row>
                <br />
            </Container>

        </>
    )
}

export default ProfileFreeforadmin
