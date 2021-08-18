import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Card, CardTitle, Col, Row, Button, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import confirm from "reactstrap-confirm";
import '../../css/category.css';
import EditCate from './Editcatefrom';
import Api from '../../api/Api';


const Showsubbymain = ({ Mid }) => {
    const [showsubcate, setShowsubcate] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(Api('subcatebyid') + Mid)

            .then((response) => {
                if (isMounted) setShowsubcate(response.data);
            });
        return () => { isMounted = false };

    }, [Mid]);

    const [showmainname, setShowmainname] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(Api('ShowMainCatebyID') + Mid)
            .then((response) => {
                if (isMounted) setShowmainname(response.data);
            });
        return () => { isMounted = false };

    }, [Mid]);

    // ลบ..................
    const deleteSubcate = async (subcateId, subcateName) => {
        let result = await confirm(
            {
                title: <> Confirmation !!</>,
                message: 'คุณต้องการลบประเภทงานย่อย"' + subcateName + '" ใช่ไหม ?',
                confirmText: "ใช่",
                confirmColor: "primary",
                cancelText: "ไม่ใช่",
                cancelColor: "danger"
            });
        if (result) {
            axios.delete(Api('subcate') + subcateId)
                .then((response) => {
                    Swal.fire(
                        'ลบข้อมูลสำเร็จ',
                        '',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    })
                })
        }
    };

    // ลบ..................
    return (
        <>
            <Container className="m5">

                <Label style={{ fontSize: 18 }}>ประเภทงาน / <Label style={{ color: "#ff5722" }}>{showmainname.main_cate_name}</Label></Label>
                <Card className="pt-2 pb-2 mt-2" inverse id="subcard">
                    <Row >
                        <Col sm={10}>
                            <Label className="text-dark ml-5" style={{ fontSize: 17 }} id="setsubText"><b>ประเภทงานย่อย</b></Label>
                        </Col>
                        <Col sm={1}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>แก้ไข</b></Label>
                        </Col>
                        <Col sm={1}>
                            <Label className="text-dark" tag="h2" id="setsubText"><b>ลบ</b></Label>
                        </Col>

                    </Row>
                </Card>
                <br />
                {showsubcate.map((sub) => (

                    <Card className="pt-2 pb-2 mb-2" inverse id="subcard" key={sub.sub_cate_id}>
                        <Row >
                            <Col sm={10}>


                                <CardTitle className="text-dark ml-5" style={{ fontSize: 15 }} id="setsubText2">{sub.sub_cate_name}</CardTitle>
                            </Col>
                            <Col sm={1}>
                                <EditCate sub_id={sub.sub_cate_id} />
                            </Col>
                            <Col sm={1}>
                                <Button color="danger" size="sm" onClick={() => deleteSubcate(sub.sub_cate_id, sub.sub_cate_name)}>ลบ</Button>
                            </Col>

                        </Row>
                    </Card>



                ))}

            </Container>
        </>
    )
}

export default Showsubbymain
