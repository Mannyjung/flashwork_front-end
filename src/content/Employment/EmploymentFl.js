import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Container, Table, } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import Swal from 'sweetalert2';
import confirm from "reactstrap-confirm";
import Api from '../../api/Api';

const EmploymentFl = (props) => {



    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const id = localStorage.getItem('User_id');
    const [employmentReq, setEmploymentReq] = useState([]);

    const [employmentPro, setEmploymentPro] = useState([]);

    const [employmentSuc, setEmploymentSuc] = useState([]);

    const [employmentSucAndR, setEmploymentSucAndR] = useState([]);
    
    useEffect(() => {
        axios.get(Api('employmentFlReq') + id)
            .then((response) => {
                setEmploymentReq(response.data)
            })
        axios.get(Api('employmentFlProgress') + id)
            .then((response) => {
                setEmploymentPro(response.data)
            })

        axios.get(Api('employmentFlSuc') + id)
            .then((response) => {
                setEmploymentSuc(response.data)
            })
        axios.get(Api('employmentFlSucAndR') + id)
            .then((response) => {
                setEmploymentSucAndR(response.data)
            })


    }, [id]);

      const showreview = (getreview) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'การรีวิว : ' + getreview,

        })

    }

    const accept = async (emm_id, emm_user_id, pk_name) => {
        let data = {
            emm_status: "กำลังดำเนินการ",
        }
        let result = await confirm(
            {
                title: <> Confirmation !!</>,
                message: 'คุณยอมรับการจ้างงานของ : "' + emm_user_id + '" จากแพ็กเกจ ' + pk_name + ' ใช่ไหม ?',
                confirmText: "ใช่",
                confirmColor: "primary",
                cancelText: "ไม่ใช่",
                cancelColor: "danger"
            });
        if (result) {
            axios
                .put(Api('employmentAccept') + emm_id, data)
                .then((response) => {

                    if (response.data.message === "success") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: ' คุณได้ยอมรับการจ้างงานของ ' + emm_user_id + ' เรียบร้อย ',
                            showConfirmButton: false,
                            timer: 1500,
                            width: 600,
                            padding: '3em',
                            background: '#ffff',
                            backdrop: `
                          rgba(0,0,123,0.4)
                          url("/image/cat.gif")
                          right top
                          no-repeat
                        ` }).then(() => {
                                window.location.reload();
                            })
                    }

                });
        }
    };
    const deleteEmployment = async (emm_id, emm_user_id, pk_name) => {

        let result = await confirm(
            {
                title: <> Confirmation !!</>,
                message: 'คุณยกเลิกการจ้างงานของ : "' + emm_user_id + '" จากแพ็กเกจ ' + pk_name + ' ใช่ไหม ?',
                confirmText: "ใช่",
                confirmColor: "primary",
                cancelText: "ไม่ใช่",
                cancelColor: "danger"
            });
        if (result) {
            axios
                .delete(Api('deleteEmployment') + emm_id)
                .then((response) => {
                    if (response.data.message === "success") {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: ' คุณได้ยกเลิกการจ้างงานของ ' + emm_user_id + 'ที่แพ็กเกจ' + pk_name + ' เรียบร้อย ',
                            showConfirmButton: false,
                            timer: 1500,
                            width: 600,
                            padding: '3em',
                            background: '#ffff',
                            backdrop: `
                          rgba(0,0,123,0.4)
                          url("/image/cat.gif")
                          right top
                          no-repeat
                        ` }).then(() => {
                                window.location.reload();
                            })
                    }

                });
        }
    };
    return (

        <>
            <center className="mt-5">
                <h1>การจ้างงาน</h1>
            </center>
            <Container style={{ marginTop: "3%" }} fluid>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            <h4 style={{ color: "black" }}>รอการตอบรับ</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            <h4 style={{ color: "black" }}>กำลังดำเนินการ</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            <h4 style={{ color: "black" }}>เสร็จสิ้น</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            <h4 style={{ color: "black" }}>เสร็จสิ้นและรีวิว</h4>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ผู้ว่าจ้าง</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็กเกจ</th>
                                            <th>วันที่</th>
                                            <th>สถานะ</th>
                                            <th>จัดการ</th>
                                        </tr>
                                    </thead>
                                    {employmentReq.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_user_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td>{requestFl.emm_status}</td>
                                                    <td>
                                                        <Button color="success"
                                                            onClick={() => accept(requestFl.emm_id, requestFl.emm_user_id, requestFl.pk_name)}
                                                        >ยอมรับ</Button>{' '}
                                                        <Button color="danger"
                                                            onClick={() => deleteEmployment(requestFl.emm_id, requestFl.emm_user_id, requestFl.pk_name)}
                                                        >ยกเลิก</Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ผู้ว่าจ้าง</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็กเกจ</th>
                                            <th>วันที่</th>
                                            <th>สถานะ</th>

                                        </tr>
                                    </thead>
                                    {employmentPro.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_user_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td>{requestFl.emm_status}</td>

                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ผู้ว่าจ้าง</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็กเกจ</th>
                                            <th>วันที่</th>
                                           

                                        </tr>
                                    </thead>
                                    {employmentSuc.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_user_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                   


                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="12">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ผู้ว่าจ้าง</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็กเกจ</th>
                                            <th>วันที่</th>
                                            <th>รีวิว</th>

                                        </tr>
                                    </thead>
                                    {employmentSucAndR.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_user_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td><Button onClick={() => showreview(requestFl.emm_review)} color="success">ดูรีวิว</Button></td>


                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        </>
    );
}

export default EmploymentFl