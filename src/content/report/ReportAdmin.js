import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import {
    Button,
    Table,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import confirm from "reactstrap-confirm";
import Swal from "sweetalert2";
import Api from "../../api/Api";

const ReportAdmin = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        axios.get(Api("report")).then((res) => {
            setReport(res.data);
        });
    }, []);

    const [readreport, setReadreport] = useState([]);
    useEffect(() => {
        axios.get(Api("readreport")).then((res) => {
            setReadreport(res.data);
        });
    }, []);

    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const updateReport = async (reportTitle, reportId, rp_user_id) => {
        let data = {
            rp_status: "Read",
        };
        let result = await confirm({
            title: <> Confirmation !!</>,
            message:
                'คุณอ่านการรายงานหัวข้อ : " ' +
                reportTitle +
                " ของชื่อผู้ใช้ " +
                rp_user_id +
                ' " ใช่ไหม ?',
            confirmText: "ใช่",
            confirmColor: "primary",
            cancelText: "ไม่ใช่",
            cancelColor: "danger",
        });
        if (result) {
            axios.put(Api("upreport") + reportId, data).then((response) => {
                //response.data.message();
                // window.location.reload();
                console.log(response.data.message);
                if (response.data.message === "success") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title:
                            " อ่านคำร้องเรียนของชื่อผู้ใช้ " + rp_user_id + " เรียบร้อย ",
                        showConfirmButton: false,
                        timer: 15000,
                        width: 600,
                        padding: "3em",
                        background: "#ffff",
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url("/image/cat.gif")
                          right top
                          no-repeat
                        `,
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    };


    

    return (
       

        <>
            <center className="mt-5">
                <h1>คำร้องเรียนจากผู้ใช้</h1>
            </center>
            <Container style={{ marginTop: "3%" }} fluid>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === "1" })}
                            onClick={() => {
                                toggle("1");
                            }}
                        >
                            <h4 style={{ color: "black" }}>คำร้องเรียน</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === "2" })}
                            onClick={() => {
                                toggle("2");
                            }}
                        >
                            <h4 style={{ color: "black" }}>คำร้องเรียนที่อ่านแล้ว</h4>
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
                                            <th>จากผู้ใช้</th>
                                            <th>หัวข้อ</th>
                                            <th>รายละเอียด</th>
                                            <th>วันที่</th>
                                            <th>ระดับความสำคัญ</th>
                                            <th>สถานะ</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {report.map((reports) => {
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td style={{ color: "#ff5722" }}>
                                                        <b>{reports.rp_user_id}</b>
                                                    </td>
                                                    <td>{reports.rp_title}</td>
                                                    <td>{reports.rp_detail}</td>
                                                    <td>{reports.rp_date}</td>
                                                    <td>{reports.rp_importance}</td>
                                                    <td style={{ color: "#ff5722" }}>
                                                        {reports.rp_status}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        <Button
                                                            color="success"
                                                            onClick={() =>
                                                                updateReport(
                                                                    reports.rp_title,
                                                                    reports.rp_id,
                                                                    reports.rp_user_id
                                                                )
                                                            }
                                                        >
                                                            อ่านแล้ว
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
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
                                            <th>จากผู้ใช้</th>
                                            <th>หัวข้อ</th>
                                            <th>รายละเอียด</th>
                                            <th>วันที่</th>
                                            <th>ระดับความสำคัญ</th>
                                            <th>สถานะ</th>
                                            
                                        </tr>
                                    </thead>
                                    {readreport.map((readed) => {
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td style={{ color: "#ff5722" }}>
                                                        <b>{readed.rp_user_id}</b>
                                                    </td>
                                                    <td>{readed.rp_title}</td>
                                                    <td>{readed.rp_detail}</td>
                                                    <td>{readed.rp_date}</td>
                                                    <td>{readed.rp_importance}</td>
                                                    <td style={{ color: "#ff5722" }}>
                                                        {readed.rp_status}
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        </>
    );
};

export default ReportAdmin;
