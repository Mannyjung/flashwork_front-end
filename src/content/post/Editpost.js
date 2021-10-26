import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import Api from '../../api/Api';

const Editpost = (props) => {
    const {
        buttonLabel = "รายละเอียดงาน",
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const initPost = {
        aw_id: "",
        aw_name: "",
        aw_detail: "",
        aw_status: "",
    }
    const [showdetail, setShowdetail] = useState(initPost);
    useEffect(() => {
        axios.get(Api('detailpost') + props.aw_id)
            .then((response) => {
                setShowdetail(response.data[0])
            })
    }, [props.aw_id]);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setShowdetail({ ...showdetail, [name]: value })
    };
    const saveEditPost = () => {
        // console.log(sub_cate_id)
        let err = ""
        if (!showdetail.aw_name) {
            err = "กรุณากรอกชื่องาน"
            document.getElementById('chkaw_name').innerHTML = err;
            return false;
        }
        if (!showdetail.aw_detail) {
            err = "กรุณากรอกรายละเอียดงาน"
            document.getElementById('chkaw_detail').innerHTML = err;
            return false;
        }
        var data = {
            aw_name: showdetail.aw_name,
            aw_detail: showdetail.aw_detail,
            aw_status: "รอดำเนินการ"
        }
        axios.put(Api('editpost') + showdetail.aw_id, data)
            .then((response) => {
                setShowdetail({ ...showdetail, data });
                Swal.fire(
                    'บันทึกข้อมูลสำเร็จ',
                    '',
                    'success'
                ).then(function () {
                    window.location.assign("/mypost");
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>

            <Button color="secondary" onClick={toggle} >{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}>แก้ไขรายละเอียดงาน</ModalHeader>
                <ModalBody>
                    <Container>
                        <Label for="exampleEmail">ชื่องาน</Label>
                        <Input
                            type="text"
                            name="aw_name"
                            id="aw_name"
                            value={showdetail.aw_name}
                            onChange={handleInputChange}
                        />
                        <span className="err" name="err" id="chkaw_name"></span>
                        <p></p>

                        <Label for="exampleText">รายละเอียด</Label>
                        <Input
                            type="textarea"
                            name="aw_detail"
                            id="aw_detail"
                            value={showdetail.aw_detail}
                            onChange={handleInputChange}
                            rows={10}
                            cols={5}
                        />
                        <span className="err" name="err" id="chkaw_detail"></span>
                        <p></p>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button block color="success" size="lg" onClick={saveEditPost}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>



        </>
    )
}

export default Editpost
