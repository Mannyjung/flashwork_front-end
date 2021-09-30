import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Button, Row, Col, Container, Table } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import Swal from 'sweetalert2';
import confirm from "reactstrap-confirm";
import Api from '../../api/Api';
import Comment from '../Work/comment';

const EmploymentEpy = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const id = localStorage.getItem('User_id');
    const [employmentReq, setEmploymentReq] = useState([]);
    const [employmentPro, setEmploymentPro] = useState([]);
    const [employmentSuc, setEmploymentSuc] = useState([]);
    const [employmentSucAndReview, setEmploymentSucAndReview] = useState([]);

    useEffect(() => {
        axios.get(Api("employmentEpyReq") + id)
            .then((response) => {
                setEmploymentReq(response.data)
            })
        axios.get(Api('employmentEpyProgress') + id)
            .then((response) => {
                setEmploymentPro(response.data)
            })

        axios.get(Api('employmentEpySuc') + id)
            .then((response) => {
                setEmploymentSuc(response.data)
                
            })

            axios.get(Api('employmentEpySucAndReview') + id)
            .then((response) => {
                setEmploymentSucAndReview(response.data)
                
            })

    }, [id]);

    const showreview = (getreview) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'การรีวิว : ' + getreview,

        })}

    const deleteEmployment = async (emm_id,emm_std_id,pk_name) => {
       
        let result = await confirm(
            {
                title: <> Confirmation !!</>,
                message: 'คุณยกเลิกการจ้างงานของ : "'+ emm_std_id + '" จากแพ็คเกจ '+ pk_name + ' ใช่ไหม ?',
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
                            title: ' คุณได้ยกเลิกการจ้างงานของ ' + emm_std_id  +'ที่แพ็คเกจ'+ pk_name+' เรียบร้อย ',
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
                        ` }).then(()=>{
                            window.location.reload();
                        })
                    }
                
                });
        }
    };

    const sucessEmployment = async (emm_id,emm_std_id,pk_name) => {
        let data = {
            emm_status: "เสร็จสิ้น",
        }
        let result = await confirm(
            {
                title: <> Confirmation !!</>,
                message: 'การจ้างงานของ : "'+ emm_std_id + '" จากแพ็คเกจ '+ pk_name + ' เสร็จสิ้นใช่ไหม ?',
                confirmText: "ใช่",
                confirmColor: "primary",
                cancelText: "ไม่ใช่",
                cancelColor: "danger"
            });
        if (result) {
            axios
                .put(Api('employmentEpySuc') + emm_id,data)
                .then((response) => {   
                    if (response.data.message === "success") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'การจ้างงานของ ' + emm_std_id  +'ที่แพ็คเกจ'+ pk_name+' เสร็จสิ้นเรียบร้อย ',
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
                        ` }).then(()=>{
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
                            <h4 name="end-work" style={{ color: "black" }}>เสร็จสิ้น</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            <h4 style={{ color: "black" }}>รีวิวแล้ว</h4>
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
                                            <th>ฟรีแลนซ์</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็คเกจ</th>
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
                                                    <td>{requestFl.emm_std_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td>{requestFl.emm_status}</td>
                                                    <td>
                                                        <Button className="cancelwork" id="cancel" color="danger"
                                                        onClick={() => deleteEmployment(requestFl.emm_id,requestFl.emm_std_id,requestFl.pk_name)}
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
                                            <th>ฟรีแลนซ์</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็คเกจ</th>
                                            <th>วันที่</th>
                                            <th>สถานะ</th>
                                            <th>จัดการ</th>
                                        </tr>
                                    </thead>
                                    {employmentPro.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_std_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td>{requestFl.emm_status}</td>
                                                    <td>
                                                        <Button id="cancel-employ" color="success"
                                                        onClick={() => sucessEmployment(requestFl.emm_id,requestFl.emm_std_id,requestFl.pk_name)}>เสร็จสิ้น</Button>{' '}
                                                  
                                                    </td>
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
                                            <th>ฟรีแลนซ์</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็คเกจ</th>
                                            <th>วันที่</th>
                                            <th>สถานะ</th>
                                            <th>จัดการ</th>

                                        </tr>
                                    </thead>
                                    {employmentSuc.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_std_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td>{requestFl.emm_status}</td>
                                                    <td>

                                                    <Comment name="review-work" emm_id={requestFl.emm_id}/>
                                                    </td>

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
                                            <th>ฟรีแลนซ์</th>
                                            <th>ชื่องาน</th>
                                            <th>ชื่อแพ็คเกจ</th>
                                            <th>วันที่</th>
                                           
                                            {/* <th>จัดการ</th> */}

                                        </tr>
                                    </thead>
                                    {employmentSucAndReview.map((requestFl) => {

                                        return (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{requestFl.emm_id}</th>
                                                    <td>{requestFl.emm_std_id}</td>
                                                    <td>{requestFl.aw_name}</td>
                                                    <td>{requestFl.pk_name}</td>
                                                    <td>{requestFl.emm_date_time}</td>
                                                    <td><Button onClick={() => showreview(requestFl.emm_review)} color="success">ดูรีวิว</Button></td>
                                                    {/* <td>

                                                    <Comment emm_id={requestFl.emm_id}/>
                                                    </td> */}

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


    )
}

export default EmploymentEpy
