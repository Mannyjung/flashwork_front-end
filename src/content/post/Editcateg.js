import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import Api from '../../api/Api';

const Editcateg = (props) => {
    const {
        buttonLabel = "ประเภทของงาน",
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [showdetail, setShowdetail] = useState([]);
    useEffect(() => {
        axios.get(Api('detailpost') + props.aw_id)
            .then((response) => {
                setShowdetail(response.data[0])
            })
    }, [props.aw_id]);


    const [maincate, setmaincate] = useState([])
    const [subcate, setsubcate] = useState([])
    const [selectcate, setselectcate] = useState(0)
    const [sub_cate_id, setsub_cate_id] = useState(0)

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(Api('MainCate'), {
            cancelToken: source.token
        })
            .then((res) => {
                setmaincate(res.data);
            }
            );
        return () => {
            source.cancel();
        }
    }, []);

    const selectsub = (e) => {
        let maincateid = e.target.value
        setselectcate(maincateid)
        axios.get(Api('subcatebyid') + maincateid)
            .then((res) => {
                setsubcate(res.data);
            });
    }

    const savecate = () => {
        let err = ""
        if (sub_cate_id === 0) {
            err = "กรุณาเลือกประเภทงาน"
            document.getElementById('chk_categ').innerHTML = err;
            return false;
        }
        var data = {
            aw_sub_cate_id: sub_cate_id,
            aw_status: "รอดำเนินการ"
        }
        console.log(data);
        axios.put(Api('editcateg') + showdetail.aw_id, data)
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
                <ModalHeader toggle={toggle}>แก้ไขประเภทงาน</ModalHeader>
                <ModalBody>
                    <Container>
                        <Label style={{ fontSize: "16px" }}>ประเภทงานหลัก : <b style={{ color: "orange" }}>{showdetail.main_cate_name}</b> ประเภทงานย่อย : <b style={{ color: "orange" }}>{showdetail.sub_cate_name}</b>  </Label>


                        <FormGroup>
                            <Label for="exampleSelect">หมวดหมู่หลัก</Label>
                            <Input type="select" name="main_cate_id" id="main_cate_id" onChange={selectsub} value={maincate.main_cate_id}>
                                <option value='0'>เลือกหมวดหมู่</option>
                                {maincate.map((maincate) => {
                                    return (
                                        <option key={maincate.main_cate_id} value={maincate.main_cate_id}>{maincate.main_cate_name} </option>
                                    )
                                })
                                }
                            </Input>
                        </FormGroup>


                        {selectcate === 0 ? ("") : (


                            <FormGroup>
                                <Label for="exampleSelect">หมวดหมู่ย่อย</Label>
                                <Input type="select" name="sub_cate_id" id="exampleSelect" onChange={e => setsub_cate_id(e.target.value)} value={sub_cate_id.sub_cate_id}>
                                    <option value='0'>เลือกหมวดหมู่</option>
                                    {subcate.map((subcate) => {
                                        return (
                                            <option key={subcate.sub_cate_id} value={subcate.sub_cate_id}>{subcate.sub_cate_name} </option>
                                        )
                                    })
                                    }
                                </Input>

                            </FormGroup>

                        )}
                        <span className="err" name="err" id="chk_categ"></span>
                        <p></p>

                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button block color="success" size="lg" onClick={savecate} >บันทึก</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Editcateg
