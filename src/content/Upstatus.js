import { Button, Snackbar, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, CardTitle, Col, Row, CardGroup, CardBody, CardText, Breadcrumb, BreadcrumbItem, Label } from 'reactstrap';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Api from '../api/Api';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(57),
        },
    },
}));
const ShowPost = ({ id }) => {
    const [state] = useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });
    const [work, setwork] = useState([])
    const [pack, setpack] = useState([])
    const [img, setimg] = useState([])
    const [comment, setcomment] = useState({})
    useEffect(() => {
        let isMounted = true;

        axios.get(Api('Checkpostbyid') + id)
            .then((res) => {
                if (isMounted) setwork(res.data[0]);
                if (isMounted) setpack(res.data[1]);
                if (isMounted) setimg(res.data[2]);
            });
        return () => { isMounted = false };

    }, [id]);

    const changestatusPass = () => {
        let data = {
            Work_status: "ผ่านการอนุมัติ",
            Adminstatus: localStorage.getItem('status')
        }
        axios.put(Api('managestatus') + id, data)
            .then((res) => {
                if (res.data.message === "success") {
                    Swal.fire(
                        'บันทึกข้อมูลสำเร็จ',
                        '',
                        'success'
                    ).then(function () {
                        window.location.assign("/checkwork");
                    });

                }
            })

    }
    const changestatusNotPass = () => {
        let data = {
            Work_status: "ไม่ผ่านการอนุมัติ",
            Adminstatus: localStorage.getItem('status'),
            Comment: comment

        }
        axios.put(Api('managestatus') + id, data)
            .then((res) => {
                if (res.data.message === "success") {
                    Swal.fire(
                        'บันทึกข้อมูลสำเร็จ',
                        '',
                        'success'
                    ).then(function () {
                        window.location.assign("/checkwork");
                    });

                }
            })


    }
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const classes = useStyles();

    const action = ([
        <Button color="primary" variant="contained" size="small" onClick={changestatusPass}>
            ผ่าน
        </Button>,
        <Button color="secondary" variant="contained" size="small" onClick={toggle}>
            ไม่ผ่าน
        </Button>
    ]);

    const { vertical, horizontal, open } = state;

    if (work.aw_status !== "ไม่ผ่านการอนุมัติ") {
        return (
            <>
                <div>
                    <Button color="none" onClick={toggle}></Button>
                    <Modal isOpen={modal} toggle={toggle} style={{ marginTop: '300px' }}>
                        <ModalHeader toggle={toggle}>ไม่อนุญาติให้ผ่านการตรวจสอบ</ModalHeader>
                        <ModalBody>
                            <Label>กรุณากรอกเหตุผล</Label>
                            <form className={classes.root} noValidate autoComplete="off" >
                                <TextField id="outlined-basic" label="รายละเอียด" variant="outlined" fullWidth type="email" onChange={e => setcomment(e.target.value)} />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={changestatusNotPass}>ตกลง</Button>{' '}
                            <Button color="secondary" onClick={toggle}>เลิกทำ</Button>
                        </ModalFooter>
                    </Modal>
                </div>

                <Breadcrumb className="mt-5">
                    <BreadcrumbItem active tag="h4">รายละเอียด</BreadcrumbItem>
                </Breadcrumb>

                <h4 className="display-4">{work.aw_name}</h4>
                <hr className="my-2" />
                <h5>[รายละเอียด]</h5>
                <span>{work.aw_detail}</span>
                <Breadcrumb className="mt-5">
                    <BreadcrumbItem active tag="h4">แพ็กเกจ</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    {pack.map((row) => (
                        <Col xs={12} sm={4} key={row.pk_id}>
                            <CardGroup>
                                <Card style={{ border: 'none' }}>
                                    <CardHeader> </CardHeader>
                                    <CardBody>
                                        <CardTitle tag="h5"> แพ็กเกจ :{row.pk_name}</CardTitle>
                                        <CardText>{row.pk_detail}</CardText>

                                    </CardBody>
                                </Card>

                            </CardGroup>
                        </Col>
                    ))}

                </Row>
                <Breadcrumb className="mt-5">
                    <BreadcrumbItem active tag="h4">รูปภาพ</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    {img.map((pic, index) => {
                        return (
                            <Col sm={2} key={index}>
                                <Card style={{ border: 'none' }}>
                                    <CardImg top width="100%" src={pic.w_img_name} />
                                </Card>
                            </Col>
                        )
                    }
                    )}
                </Row>

                <Card>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        message="ตรวจสอบ"
                        key={vertical + horizontal}
                        action={action}
                        style={{ marginTop: '50px', marginLeft: '50px' }}
                    >

                    </Snackbar>

                </Card>



            </>
        )
    } else {
        window.location.assign("/checkwork");
    }
}

export default ShowPost
