import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Container, Row, Col } from 'reactstrap';
import '../css/useraccount.css';
import '../css/cardhome.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Api from '../api/Api';

const Useraccount = ({ id }) => {
    const [showaccount, setShowaccount] = useState([]);
    const [showaccountwork, setShowaccountwork] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(Api('getStudent') + id, {
        })
            .then((res) => {
                if (isMounted) setShowaccount(res.data[0]);
            })

        return () => { isMounted = false };
    }, [id]);

    useEffect(() => {
        let isMounted = true;
        axios.get(Api('mypostForProflie') + id, {
        })
            .then((res) => {
                if (isMounted) setShowaccountwork(res.data);
            })
        return () => { isMounted = false };

    }, [id]);



    return (
        <>
            <Container style={{ marginTop: "5%" }}>
                <Row>

                    <Col sm="4">
                        <Card>
                            <br />
                            <center>
                            <CardImg className="imgaccount" src={showaccount.std_image} />
                            </center>
                            <br />
                        </Card>
                    </Col>
                    {/* --------------------------------------- card 1 ------------------------------------------------------- */}

                    <Col sm="8">
                        <Card>
                        <CardBody>
                                <CardTitle tag="h5"><b>แนะนำตัวเอง</b></CardTitle>
                                <br />
                                <CardText>
                                    ชื่อ - นามสกุล : {showaccount.std_fname} {showaccount.std_lname} <br />
                                    <hr />

                                    อีเมลล์ : {showaccount.std_email}<br />
                                    <hr />

                                    เบอร์โทรศัพท์ติดต่อ : {showaccount.std_phone}<br />
                                    <hr />
                                กำลังศึกษาอยู่ : {showaccount.major_name}  {showaccount.fac_name}  มหาวิทยาลัยราชภัฏนครปฐม
                                </CardText>

                            </CardBody>
                           
                        </Card>

                        {/* ---------------------------------------------- card 3 ------------------------------------------------------ */}

                        <br />
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5"><b>คำอธิบาย</b></CardTitle>
                                <p style={{ fontSize: 16 }}>{showaccount.std_description}</p>

                            </CardBody>
                        </Card>
                    </Col>
                    {/* -------------------------------------------- card 4 ------------------------------------------------------------- */}

                    <br />
                    <CardTitle tag="h1"><b>งานของฉัน</b></CardTitle>
                    <Row>
                        {showaccountwork.map((accountwork, index) => {
                            return (


                                <Col sm="4" key={index}>
                                    <a className="linkwork" href={"/SelectPost/" + accountwork.aw_id} >
                                        <Card className="cardw">

                                            <CardHeader
                                                avatar={
                                                    <Avatar alt="Travis Howard"
                                                        src={accountwork.std_image} />
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                
                                                title={accountwork.std_fname}
                                                subheader={accountwork.aw_std_id}
                                            />
                                            <CardImg className="imgwork" src={accountwork.w_img_name} />
                                            <CardBody className="textname">
                                                <Row >
                                                    <Col sm="6" className="cwc11">
                                                        <b><CardText>{accountwork.aw_name}</CardText></b>
                                                    </Col>
                                                    <Col sm="6" className="cwc11">
                                                        <CardText>ราคาเริ่มต้น {accountwork.pk_price} &nbsp; {accountwork.pk_time_period}</CardText>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                        <br />
                                    </a>

                                </Col>
                            )
                        })}
                    </Row>

                    {/* -------------------------------------------- card 5 ------------------------------------------------------------- */}

                </Row>
                <br />


            </Container>

        </>
    );
}



export default Useraccount
