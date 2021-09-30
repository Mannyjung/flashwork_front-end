import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Card, CardTitle, Col, Label, Row, Button, Container } from 'reactstrap';
import confirm from "reactstrap-confirm";
import Modals from './Modals';
import ModalsP from './ModalPacks';
import Api from '../../api/Api';
import '../../css/cardhome.css';
const Showpackage = ({ id }) => {


    const [showPackage, setShowPackage] = useState([]);
    useEffect(() => {
        axios.get(Api('getPackage') + id)
            .then((response) => {
                setShowPackage(response.data)
            })

    }, [id]);
    const deletePackage = async (pk_id) => {
        let result = await confirm(
            {
                title: <> Confirmation !!</>,
                message: 'คุณต้องการลบ"' + pk_id + '" ใช่ไหม ?',
                confirmText: "ใช่",
                confirmColor: "primary",
                cancelText: "ไม่ใช่",
                cancelColor: "danger"
            });
        if (result) {
            axios.delete(Api('deletePackage') + pk_id)
                .then((response) => {
                    Swal.fire(
                        'ลบข้อมูลสำเร็จ',
                        '',
                        'success'
                    )
                    .then(() => {
                        window.location.reload()
                    })
                })
        }
    };


    return (
        <>
            <Container >
                <center> <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>แพ็คเก็จของงาน <b style={{ color: "#ff5722" }}>({id})</b> </h1></center>
            </Container>
          <ModalsP id={id} />
            <Container fluid>
                <Card className="pt-3 pb-3 mt-2" id="subcard">
                    <Row >
                        <Col sm={2}>
                            <Label className="text-dark ml-5" style={{ fontSize: 17 }} id="setsubText"><b>#</b></Label>
                        </Col>
                        <Col sm={2}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>ชื่อแพ็คเก็จ</b></Label>
                        </Col>
                        <Col sm={4}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>รายละเอียด</b></Label>
                        </Col>
                        <Col sm={1}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>ราคา</b></Label>
                        </Col>
                        <Col sm={1}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>ระยะเวลา</b></Label>
                        </Col>
                        <Col sm={1}>
                            <Label className="text-dark ml-5" tag="h2" id="setsubText"><b>จัดการ</b></Label>
                        </Col>

                    </Row>
                </Card>
                <br />
                {showPackage.map((showPackages) => (
                    <>
                        <Card className="pt-5 pb-5 mb-3" id="subcard">
                            <Row >
                                <Col sm={2}>
                                    <CardTitle className="text-dark ml-5" style={{ fontSize: 15 }} >{showPackages.pk_id}</CardTitle>
                                </Col>
                                <Col sm={2}>
                                    <CardTitle className="text-dark" id="pk_Over" style={{ fontSize: 15 }} >{showPackages.pk_name}</CardTitle>
                                </Col>
                                <Col sm={4}>
                                    <CardTitle  className="text-dark" id="pk_Over" >{showPackages.pk_detail}</CardTitle>
                                </Col>
                                <Col sm={1}>
                                    <CardTitle className="text-dark" style={{ fontSize: 15 }} >{showPackages.pk_price}</CardTitle>
                                </Col>
                                <Col sm={1}>
                                    <CardTitle className="text-dark" style={{ fontSize: 15 }} >{showPackages.pk_time_period}</CardTitle>
                                </Col>
                                <Col sm={1}>
                                    {/* <Button className="" color="success" size="sm">แก้ไข</Button> */}
                                   <Modals pkid={showPackages.pk_id}/>
                                </Col>
                                <Col sm={1}>
                                    <Button color="danger" size="sm" onClick={() => deletePackage(showPackages.pk_id)}>ลบ</Button>
                                </Col>
                            </Row>
                        </Card>
                    </>
                ))}


            </Container>
        </>

    )
}

export default Showpackage
