import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Label } from 'reactstrap';
import '../../css/modal.css'
import Api from '../../api/Api';
const ModalPacks = (props) => {
    const {
        buttonLabel = "เพิ่มแพ็คเก็จ",
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const newPacks = {
        pk_name: "",
        pk_detail: "",
        pk_price: "",
        pk_aw_id: "",
        pk_time_period: ""
    };

    const [newpackage, setNewpackage] = useState(newPacks);
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setNewpackage({ ...newpackage, [name]: value })
    };
    const saveNewPackage = () => {
        let err = ""
        if (!newpackage.pk_name) {
            err = "กรุณากรอกชื่องาน"
            document.getElementById('chk-pk_name').innerHTML = err;
            return false;
        }
        if (!newpackage.pk_detail) {
            err = "กรุณากรอกรายละเอียดแพ็คเก็จ"
            document.getElementById('chk-pk_detail').innerHTML = err;
            return false;
        }
        if (!newpackage.pk_price) {
            err = "กรุณากรอกราคา"
            document.getElementById('chk-pk_price').innerHTML = err;
            return false;
        }
        if (!newpackage.pk_time_period) {
            err = "กรุณาเลือกระยะเวลา"
            document.getElementById('chk-pk_time_period').innerHTML = err;
            return false;
        }

        var data = {
            pk_name: newpackage.pk_name,
            pk_detail: newpackage.pk_detail,
            pk_price: newpackage.pk_price,
            pk_aw_id: props.id,
            pk_time_period: newpackage.pk_time_period
        }
        axios.post(Api('newpackage'), data)
            .then((response) => {
                Swal.fire(
                    'บันทึกข้อมูลสำเร็จ',
                    '',
                    'success'
                ).then(function () {
                    window.location.reload();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Container fluid>
                <div align="right">
                    <Button color="success" onClick={toggle} size="lg">{buttonLabel}</Button>
                </div>
            </Container>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}>เพิ่มแพ็คเก็จ</ModalHeader>
                <ModalBody>
                    <Container>
                        <Label>ชื่อแพ็คเก็จ</Label>
                        <Input
                            type="text"
                            name="pk_name"
                            onChange={handleInputChange}

                        />
                        <span className="err" name="err" id="chk-pk_name"></span>
                        <p></p>
                        <br />
                        <Label>รายละเอียด</Label>
                        <Input
                            type="textarea"
                            name="pk_detail"
                            onChange={handleInputChange}
                        />
                         <span className="err" name="err" id="chk-pk_detail"></span>
                        <p></p>
                        <br />
                        <Label>ราคา</Label>
                        <Input
                            type="text"
                            name="pk_price"
                            onChange={handleInputChange}
                        />
                          <span className="err" name="err" id="chk-pk_price"></span>
                        <p></p>
                        <br />
                        <Label for="exampleEmail">ระยะเวลาในการทำงานโดยประมาณ</Label>
                        <Input type="select" name="pk_time_period" id="pk_time_period" onChange={handleInputChange}>
                            <option value="">เลือกระยะเวลา</option>
                            <option value="ภายใน 3 วัน">3 วัน</option>
                            <option value="ภายใน 7 วัน" >7 วัน</option>
                            <option value="ภายใน 14 วัน">14 วัน</option>
                            <option value="ภายใน 21 วัน">21 วัน</option>
                            <option value="ภายใน 30 วัน">30 วัน</option>

                        </Input>
                        <span className="err" name="err" id="chk-pk_time_period"></span>
                        <p></p>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={saveNewPackage}>ตกลง</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalPacks
