import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Label, Row, Card, Container, CardTitle } from 'reactstrap'
import Api from '../../api/Api';
import Modals from './EditMain';
import '../../css/category.css';

const FromMain = (props) => {



    //  showmain........
    const [showmaincate, setShowmaincate] = useState([]);

    useEffect(() => {
        axios.get(Api('MainCate'))

            .then((response) => {
                setShowmaincate(response.data);
            });
    }, []);
    //  showmain........   

    return (
        <>
            <Container>
                <Label className="text-center mt-5 mb-3" style={{ fontSize: 30 }}>จัดการประเภทงานหลัก</Label>

                <Card className="pt-2 pb-2 mt-2" inverse id="subcard">
                    <Row >
                        <Col sm={10}>
                            <Label className="text-dark ml-5" style={{ fontSize: 17 }} id="setsubText"><b>ประเภทงานหลัก</b></Label>
                        </Col>
                        <Col sm={2}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>แก้ไข</b></Label>
                        </Col>

                    </Row>
                </Card>
                <br />

                {showmaincate.map((maincate) => {
                    return (

                        <Card className="pt-2 pb-2 mb-2" inverse id="subcard">
                            <Row >
                                <Col sm={10}>


                                    <CardTitle className="text-dark ml-5" style={{ fontSize: 15 }} id="setsubText2">{maincate.main_cate_name}</CardTitle>
                                </Col>
                                <Col sm={2}>
                                    <Modals id={maincate.main_cate_id} />
                                </Col>


                            </Row>
                        </Card>

                    )
                })}

            </Container>
        </>
    )
}

export default FromMain
