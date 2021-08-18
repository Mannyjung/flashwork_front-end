import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import Api from '../../api/Api';

const EditMain = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const initMaincate = {
        main_cate_id: "",
        main_cate_name: ""
    }
    const [editmain, setEditmain] = useState(initMaincate);
   
    useEffect(() => {
        axios.get(Api('ShowMainCatebyID') + props.id)
            .then((response) => {
                setEditmain(response.data)
            })

    }, [props.id]);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setEditmain({ ...editmain, [name]: value })
    };

    const saveEditmaincate = () => {
        var data = {

            main_cate_name: editmain.main_cate_name
        }
        axios.put(Api('editMainCate') + props.id, data)
            .then((response) => {
                setEditmain({ ...editmain, data });
                Swal.fire(
                    'บันทึกข้อมูลสำเร็จ',
                    '',
                    'success'
                ).then(function () {
                    window.location.assign("/managemaincate");
                });
            })
            .catch((error) => {
                console.log(error);

            });

    }
    return (
        <>

            <Button id="btn-editcate" style={{backgroundColor:"#ff5722", color:"white"}} onClick={toggle}>แก้ไข</Button>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}><b>แก้ไขประเภทงานหลัก</b></ModalHeader>
                <ModalBody>
                    <Label for="" sm={4} size="">ประเภทงานหลัก</Label>
                    <Input name="main_cate_name" onChange={handleInputChange} value={editmain.main_cate_name} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveEditmaincate}>ตกลง</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>
            

        </>
    )
}

export default EditMain
