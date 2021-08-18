import React, { useState } from 'react'
import { Container } from '@material-ui/core';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import Api from '../../api/Api';


const ReportFree = () => {


    const initReport = {
        rp_id: "",
        rp_user_id: "",
        rp_title: "",
        rp_detail: "",
        rp_date: "",
        rp_importance: "",
        rp_status: ""
    };
    const [report, setReport] = useState(initReport);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setReport({ ...report, [name]: value })
    };
    const saveReport = () => {
        var data = {
            rp_user_id: localStorage.getItem('User_id'),
            rp_title: report.rp_title,
            rp_detail: report.rp_detail,
            rp_importance: report.rp_importance,
            rp_status: "NotRead",
        }
        axios.post(Api('report'), data)
            .then((response) => {
                if (response.data.message === "success") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เพิ่มการรายงานสำเร็จ',
                        showConfirmButton: false,
                        timer: 15000,
                        width: 600,
                        padding: '3em',
                        background: '#ffff',
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url("/image/cat.gif")
                          right top
                          no-repeat
                        ` })
                    // Swal.fire({
                    //     title: 'Sweet!',
                    //     text: 'Modal with a custom image.',
                    //     imageUrl: '/image/cat2.gif',
                    //     imageWidth: 400,
                    //     imageHeight: 200,
                    //     imageAlt: 'Custom image',
                    //   })
                    setReport(initReport);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);


            });
    };
    return (
        <>
            <Container>
                <h1 style={{ marginBottom: "3%", marginTop: "10%" }}>คำร้องเรียน</h1>
                <Form>
                    <Card>


                        <CardBody>
                            <Row form>
                               
                                    <Col md={6}>
                                         <FormGroup>
                                        <Label for="rp_title" style={{ fontSize: "26px" }}>หัวข้อคำร้องเรียน</Label>
                                        <Input type="rp_title" name="rp_title" id="rp_title" placeholder="หัวข้อการรายงาน" onChange={handleInputChange} required />
                                  </FormGroup>  
                                  </Col>


                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleZip" style={{ fontSize: "26px" }}>ระดับความสำคัญ</Label>
                                            <Input type="select" name="rp_importance" onChange={handleInputChange}>
                                                <option selected  >เลือกระดับความสำคัญ</option>
                                                <option value="1" >น้อยที่สุด</option>
                                                <option value="2" >น้อย</option>
                                                <option value="3">ปานกลาง</option>
                                                <option value="4">มาก</option>
                                                <option value="5">มากที่สุด</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>

                                
                            </Row>

                            <FormGroup>
                                <Label for="exampleAddress" style={{ fontSize: "26px" }}>รายละเอียด</Label>
                                <Input type="textarea" name="rp_detail" id="exampleText" onChange={handleInputChange} />
                            </FormGroup>


                            <Button name="send-report" color="success" className="btn-lg float-right" size="lg" onClick={saveReport}>ยืนยัน</Button>
                        </CardBody>
                    </Card>
                </Form>
            </Container>
        </>
    )
}

export default ReportFree
