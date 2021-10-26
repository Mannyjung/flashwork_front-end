import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/modal.css'
import Api from '../../api/Api';
const Modals = (props) => {
    const {
        buttonLabel = "แก้ไข",
    } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [showPackagebyid, setShowPackagebyid] = useState([]);
    useEffect(() => {
        axios.get(Api('getPackagebyId') + props.pkid)
            .then((response) => {
                setShowPackagebyid(response.data[0])
            });
    }, [props.pkid]);
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setShowPackagebyid({ ...showPackagebyid, [name]: value })
    };
    const EditPack = () => {
        let err = ""
        if (!showPackagebyid.pk_name) {
            err = "กรุณากรอกชื่องาน"
            document.getElementById('chk-pk_name').innerHTML = err;
            return false;
        }
        if (!showPackagebyid.pk_detail) {
            err = "กรุณากรอกรายละเอียดแพ็คเก็จ"
            document.getElementById('chk-pk_detail').innerHTML = err;
            return false;
        }
        if (!showPackagebyid.pk_price) {
            err = "กรุณากรอกราคา"
            document.getElementById('chk-pk_price').innerHTML = err;
            return false;
        }
        var data = {
            pk_name: showPackagebyid.pk_name,
            pk_detail: showPackagebyid.pk_detail,
            pk_price: showPackagebyid.pk_price,
            pk_time_period: showPackagebyid.pk_time_period,
        }
        axios.put(Api('editpackage') + showPackagebyid.pk_id, data)
            .then((response) => {
                setShowPackagebyid({ ...showPackagebyid, data });
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
        <div>
            <Button color="success" onClick={toggle} size="sm">{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}>แก้ไข Package</ModalHeader>
                <ModalBody>
                    <Container>
                        <Label>ชื่อแพ็คเก็จ</Label>
                        <Input
                            type="text"
                            name="pk_name"
                            value={showPackagebyid.pk_name}
                            onChange={handleInputChange}
                        />
                          <span className="err" name="err" id="chk-pk_name"></span>
                        <p></p>
                        <br />
                      
                        <Label>รายละเอียด</Label>
                        <Input
                            type="textarea"
                            name="pk_detail"
                            value={showPackagebyid.pk_detail}
                            onChange={handleInputChange}
                        />
                          <span className="err" name="err" id="chk-pk_detail"></span>
                        <p></p>
                        <br />
                        <Label>ราคา</Label>
                        <Input
                            type="text"
                            name="pk_price"
                            value={showPackagebyid.pk_price}
                            onChange={handleInputChange}

                        />
                         <span className="err" name="err" id="chk-pk_price"></span>
                        <p></p>
                        <br />
                        <Label for="exampleEmail">ระยะเวลาในการทำงานโดยประมาณ</Label>
                        <Input type="select" name="pk_time_period" id="timeperiod" onChange={handleInputChange} value={showPackagebyid.pk_time_period}>
                            <option value="">{showPackagebyid.pk_time_period}</option>
                            <option value="ภายใน 3 วัน">3 วัน</option>
                            <option value="ภายใน 7 วัน" >7 วัน</option>
                            <option value="ภายใน 14 วัน">14 วัน</option>
                            <option value="ภายใน 21 วัน">21 วัน</option>
                            <option value="ภายใน 30 วัน">30 วัน</option>

                        </Input>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={EditPack}>ตกลง</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Modals
