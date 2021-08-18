import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button,  Input,  Label , Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import Api from '../../api/Api';

const Editcatefrom = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const initSubcate = {
        sub_cate_id: "",
        main_cate_id: "",
        sub_cate_name: "",
        main_cate_name: ""
    }
    const [editsubcate, setEditsubcate] = useState(initSubcate);
    useEffect(() => {
        axios.get(Api('subcate') + props.sub_id)
            .then((response) => {
                setEditsubcate(response.data)
            })

    }, [props.sub_id]);


    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setEditsubcate({ ...editsubcate, [name]: value })
    };

    const saveEditsubcate = () => {

        var data = {
            main_cate_id: editsubcate.main_cate_id,
            sub_cate_name: editsubcate.sub_cate_name
        }
        axios.put(Api('subcate') + editsubcate.sub_cate_id, data)
            .then((response) => {
                setEditsubcate({ ...editsubcate, data });
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
            {/* <Label className="text-center" style={{ fontSize: 50 }}>แก้ไขประเภทงานย่อย</Label>
            <FormGroup row>
                <Label for="" sm={2} size="lg">ประเภทงานย่อย</Label>
                <Col sm={4}>
                    <Input type="text" name="main_cate_id" value={editsubcate.main_cate_name} readOnly onChange={handleInputChange} />

                </Col>
                <Col sm={6}>
                    <InputGroup>
                        <Input name="sub_cate_name" value={editsubcate.sub_cate_name} onChange={handleInputChange} />
                        <InputGroupAddon addonType="append">
                            <Button id="btn-addcate" onClick={saveEditsubcate}>แก้ไข</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>

            </FormGroup> */}

            <Button color="success" size="sm" onClick={toggle}>แก้ไข</Button>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}>แก้ไขประเภทงานย่อย</ModalHeader>
                <ModalBody>
                    <Label for="" sm={4} size="">ประเภทงานย่อย</Label>
                    <Input name="sub_cate_name" onChange={handleInputChange} value={editsubcate.sub_cate_name} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveEditsubcate}>ตกลง</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Editcatefrom
