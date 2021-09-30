import React, { useEffect, useState } from 'react';
import '../../css/regfree.css';
import '../../css/comment.css';
import { CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, InputGroupAddon, InputGroup, Input, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { Card } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import Api from '../../api/Api';


const Comment = (props) => {
    const [showcomment, setShowomment] = useState([]);
    useEffect(() => {
        axios.get(Api('show_comment') + props.emm_id)
            .then((response) => {
                setShowomment(response.data[0])
            })
    }, [props.emm_id]);

    const {
        buttonLabel = "รีวิว",

    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [insertcomment, setComment] = useState([]);
    const handleInputChange = (event) => {
        let { name, value } = event.target;

        setComment({ ...insertcomment, [name]: value })
    };
    const saveComment = () => {
        let data = {
            emm_review: insertcomment.emm_review,
            emm_status: "เสร็จสิ้นและรีวิว"
        }
        // console.log(props.emm_id);
        axios.put(Api('addreview') + props.emm_id, data)
            .then((response) => {
                setComment({ ...insertcomment, data });
                if (response.data.message === "success") {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'คอมเมนต์สำเร็จ',
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

            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (

        <>
            <Button color="success" onClick={toggle} size="sm">{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className="fixmodal">
                <ModalHeader toggle={toggle}>ที่ต้องรีวิว</ModalHeader>
                <ModalBody>
                    <Card>
                        <CardHeader  >

                            <img className="border rounded-circle  mb-0" width="50" src={showcomment.std_image} height="50" alt="">
                            </img> <b>{showcomment.std_fname} {showcomment.std_lname}</b>

                        </CardHeader>
                        <CardImg top width="500px" height="250px" src={showcomment.w_img_name} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5"  ><b>ชื่องาน: {showcomment.aw_name} </b></CardTitle>
                            <CardTitle tag="h5" className="mb-2 text-muted">ชื่อแพ็คเกจ: {showcomment.pk_name}</CardTitle><br></br>
                            <CardSubtitle tag="h5">
                                วันเวลาที่ทำงานเสร็จ:{showcomment.emm_date_time}
                            </CardSubtitle>
                            <br></br>
                            <CardText tag="h5" style={{ color: 'red' }} >รวมราคา {showcomment.pk_price} บาท </CardText>

                            <br></br>

                            <CardTitle>
                                <InputGroup size="lg">
                                    <Input type="text" name="emm_review" onChange={handleInputChange} placeholder="ช่องเขียนคอมเมนต์" />
                                    <InputGroupAddon addonType="append">

                                    </InputGroupAddon>
                                </InputGroup>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button name="send-commend" color="success" onClick={saveComment} >ส่ง</Button>

                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>

        </>
    )
}

export default Comment
