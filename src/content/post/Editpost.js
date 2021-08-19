import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup} from 'reactstrap';
import Swal from 'sweetalert2';
import Api from '../../api/Api';

const Editpost = (props) => {
    const {
        buttonLabel = "แก้ไข",
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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
        console.log(sub_cate_id)
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
        <div>

            <Button color="secondary" onClick={toggle} >{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}>แก้ไขงาน</ModalHeader>
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
                        {/* <Label for="exampleSelect">หมวดหมู่</Label> */}
                        
                        {/* <Input type="text" name="main_cate_id" id="main_cate_id" value={showdetail.aw_sub_cate_id} hidden /> */}

{/* 
                        <FormGroup>
                            <Label for="exampleSelect">หมวดหมู่หลัก</Label>
                            <Input type="select" name="main_cate_id" id="main_cate_id" onChange={selectsub} >
                                <option value='0'>เลือกหมวดหมู่</option>
                                {maincate.map((maincate) => {
                                    return (
                                        <option key={maincate.main_cate_id} value={maincate.main_cate_id}>{maincate.main_cate_name} </option>
                                    )
                                })
                                }
                            </Input>
                        </FormGroup>

                            < FormGroup >
                                <Label for="exampleSelect">หมวดหมู่ย่อย</Label>
                                <Input type="select" name="sub_cate_id" id="exampleSelect" onChange={e => setsub_cate_id(e.target.value)} value={sub_cate_id} >
                                    <option value='0'>เลือกหมวดหมู่</option>
                                    {subcate.map((subcate) => {
                                        return (
                                            <option key={subcate.sub_cate_id} value={subcate.sub_cate_id}>{subcate.sub_cate_name} </option>
                                        )
                                    })
                                    }
                                </Input>

                            </FormGroup> */}
                            
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button block color="success" size="lg" onClick={saveEditPost}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
                </ModalFooter>
            </Modal>



        </div>
    )
}

export default Editpost
