import axios from 'axios';
import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import Api from '../../api/Api';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { storage } from "../../firebase";


const AddMaincate = () => {


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    //  insert main.......
    const initCate = {
        main_cate_name: "",
        main_cate_img: "",
    };


    //--------------------------------------------------------------
    const uploadFileToFirebase = (file) => {
        const userId = "cate001";
        const timestamp = Math.floor(Date.now() / 1000);
        const newName = userId + "_" + timestamp;
        const uploadTask = storage.ref(`category/${newName}`).put(file);
        uploadTask.on("state_changed", (snapshot) => {
        },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("category")
                    .child(newName)
                    .getDownloadURL()
                    .then((imageURL) => {
                        saveMaincate(imageURL);
                    });
            }
        )
    }

    const formik = useFormik({
        initialValues: initCate,
        validationSchema: yup.object().shape({


        }),
        onSubmit: (values) => {
            if (values.file) {
                uploadFileToFirebase(values.file)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณากรอกข้อมูลให้ครบ',
                    confirmButtonText: 'ตกลง'

                })
            }
        },
    });



    const saveMaincate = (imageURL) => {
        var data = {
            status: localStorage.getItem('status'),
            main_cate_name: formik.values.main_cate_name,
            main_cate_img: imageURL
        }

        axios.post(Api('addMainCate'), data)
            .then((res) => {
                if (res.data.message === "success") {
                    Swal.fire(
                        'บันทึกข้อมูลสำเร็จ',
                        '',
                        'success'
                    )
                    window.location.reload();
                } else if (res.data.message === "dupicate category") {
                    Swal.fire({
                        icon: 'error',
                        title: 'มีหมวดหมู่นี้อยู่เเล้ว',
                        confirmButtonText: 'ตกลง'
                    })
                    window.location.reload();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'มีหมวดหมู่นี้อยู่เเล้ว',
                        confirmButtonText: 'ตกลง'
                    })
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);

            });

    }




    //  insert main.......
    return (
        <>
            {/* <Label className="text-center" style={{ fontSize: 30 }}>เพิ่มประเภทงานหลัก</Label> */}

            {/* <Button onClick={saveMaincate} id="btn-addcate">เพิ่ม</Button> */}
            <center>
                <Button id="btn-macate" style={{ backgroundColor: "#ff5722", color: "white" }} size="lg" onClick={toggle}>เพิ่มประเภทงานหลัก</Button>{' '}{' '}

                <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                    <ModalHeader toggle={toggle}><b>เพิ่มประเภทงานหลัก</b></ModalHeader>
                    <Form onSubmit={formik.handleSubmit} >
                        <ModalBody>
                            <Label for="" sm={4} size="">ประเภทงานหลัก</Label>
                            <Input type="text" name="main_cate_name" value={formik.values.main_cate_name}
                                onChange={formik.handleChange} />
                            <Label for="" sm={4} size="">เพิ่มรูปพื้นหลัง</Label>

                            <Input
                                type="file"
                                name="main_cate_img"
                                id="main_cate_img"
                                onChange={(event) => {
                                    formik.setFieldValue("file", event.currentTarget.files[0]);
                                }}

                            />
                            {formik.errors.main_cate_img && formik.touched.main_cate_img && (
                                <p style={{ color: "red" }}>{formik.errors.main_cate_img}</p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" onClick={saveMaincate}>ตกลง</Button>{' '}
                            <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                        </ModalFooter></Form>
                </Modal>

                <Button href="/managemaincate" size="lg" color="secondary">จัดการประเภทงานหลัก</Button>
            </center>



        </>
    )
}

export default AddMaincate
