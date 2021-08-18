import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Swal from 'sweetalert2'
import Api from '../../api/Api';

const AddSubcate = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    //  insert sub.......
    const initSubcate = {
        main_cate_id: props.Mid,
        sub_cate_name: "",
    };
    const [addsubcate, setAddSubcate] = useState(initSubcate);
    const handleInputChange = (event) => {
        let { name, value } = event.target;

        setAddSubcate({ ...addsubcate, [name]: value })
    };
    const saveSubcate = () => {

        var data = {
            status: localStorage.getItem('status'),
            main_cate_id: addsubcate.main_cate_id,
            sub_cate_name: addsubcate.sub_cate_name
        }
        axios.post(Api('Addsubcate'), data)
            .then((response) => {
                if (response.data.message === "success") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เพิ่มประเภทงานเรียบร้อย',
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
                        .then(() => {
                            window.location.reload();
                        });
                } else if (response.data.message === "fail") {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'ไม่สามารถเพิ่มประเภทย่อยงานซ้ำได้',
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
                    window.location.reload();
                }
            }

            )
            .catch((error) => {
                console.log(error);

            });

    }

    return (
        <>
            <Container>
                <FormGroup row>
                    <Col>
                        <Label className="text-center mt-5 mb-3" style={{ fontSize: 36 }}>จัดการประเภทงานย่อย</Label><br />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col></Col>
                    <Button id="btn-macate" style={{ backgroundColor: "#ff5722", color: "white" }} onClick={toggle} size="lg">เพิ่มประเภทงานย่อย</Button>
                </FormGroup>
                <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                    <ModalHeader toggle={toggle}>เพิ่มประเภทงานย่อย</ModalHeader>
                    <ModalBody>
                        <Label for="" sm={4} size="">ประเภทงานย่อย</Label>
                        <Input name="sub_cate_name" onChange={handleInputChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveSubcate}>ตกลง</Button>{' '}
                        <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>


            </Container>
        </>
    )
}

export default AddSubcate
