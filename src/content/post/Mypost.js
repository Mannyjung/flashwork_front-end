import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Card, Modal, ModalHeader, ModalBody, Container, Row, Col, CardImg, CardBody, CardText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import '../../css/cardhome.css';
import Editpost from './Editpost';
import Editcateg from './Editcateg';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PriorityHighSharpIcon from '@material-ui/icons/PriorityHighSharp';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Api from '../../api/Api';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const Mypost = () => {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [mypost, setMypost] = useState([]);
    const id = localStorage.getItem('User_id');
    useEffect(() => {
        let isMounted = true;
        axios.get(Api('mypost') + id)
            .then((response) => {
                if (isMounted) setMypost(response.data)
            })
        return () => { isMounted = false };
    }, [id]);


    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <>
            <center><h1 style={{ marginTop: "3%", marginBottom: "2%" }}>งานของฉัน <b style={{ color: "orange" }}>({id})</b></h1></center>
            <Container>
                <Row>

                    {mypost.filter(data => data.aw_std_id === id).map(myposts => {
                        if (myposts.aw_status === 'ไม่ผ่านการอนุมัติ') {
                            return (
                                <Col md="4">

                                    <Card className="card-mypost">
                                        <Row>
                                            <Col sm="10">
                                                <CardHeader
                                                    avatar={
                                                        <Avatar alt="Travis Howard"
                                                            src={myposts.std_image} />
                                                    }

                                                    title={myposts.std_fname}
                                                    subheader={myposts.aw_std_id}
                                                />
                                            </Col>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className="btn-icon btn-2" style={{ backgroundColor: "white", color: "black", border: "none" }} type="button">
                                                    <span className="btn-inner--icon">
                                                        <MoreVertIcon />
                                                    </span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem divider />
                                                    <DropdownItem style={{ fontSize: "16px" }} href={"/mypackage/" + myposts.aw_id}>แพ็คเก็จ</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem style={{ fontSize: "16px" }} href={"/myphotos/" + myposts.aw_id}>รูปภาพ</DropdownItem>
                                                    <DropdownItem divider />
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Row>
                                        <CardImg className="imgwork" src={myposts.w_img_name} />
                                        <CardBody >
                                            <Row >
                                                <Col sm="12" className="textname-mypost">
                                                    <b><CardText className="nameMyPost">{myposts.aw_name}</CardText></b>
                                                    <CardText className="nameMyPost"><b style={{ color: "#ff5722" }}>ประเภทงาน</b>
                                                        : <b>{myposts.main_cate_name}</b>{' '}
                                                        , <b style={{ color: "orange" }}>{myposts.sub_cate_name}</b>
                                                    </CardText>
                                                </Col>

                                            </Row>
                                            <CardText><b style={{ color: "#ff5722" }}>สถานะ </b>
                                                <b> : {myposts.aw_status}
                                                    <PriorityHighSharpIcon onClick={toggle} aria-owns={open ? 'mouse-over-popover' : undefined}
                                                        aria-haspopup="true"
                                                        onMouseEnter={handlePopoverOpen}
                                                        onMouseLeave={handlePopoverClose}
                                                        style={{ color: "red", width: "20px" }}></PriorityHighSharpIcon>
                                                </b>
                                                <Popover
                                                    id="mouse-over-popover"
                                                    className={classes.popover}
                                                    classes={{
                                                        paper: classes.paper,
                                                    }}
                                                    open={open}
                                                    anchorEl={anchorEl}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    onClose={handlePopoverClose}
                                                    disableRestoreFocus
                                                >
                                                    <Typography>กดเพื่อดูรายละเอียด</Typography>
                                                </Popover>
                                            </CardText>
                                            <Modal isOpen={modal} toggle={toggle} style={{ marginTop: '300px' }}>
                                                <ModalHeader>สาเหตุที่ไม่ผ่านการตรวจสอบ</ModalHeader>
                                                <ModalBody>
                                                    <span>{myposts.Comment}</span>
                                                </ModalBody>
                                            </Modal>

                                            <hr />
                                            <Row>
                                                <Col sm="6">
                                                    <Editpost aw_id={myposts.aw_id} />
                                                </Col>
                                                <Col sm="6">
                                                    <Editcateg aw_id={myposts.aw_id} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card> <br /><br />
                                </Col>
                            )
                        } else {
                            return (
                                <Col md="4">

                                    <Card className="card-mypost">
                                        <Row>
                                            <Col sm="10">
                                                <CardHeader
                                                    avatar={
                                                        <Avatar alt="Travis Howard"
                                                            src={myposts.std_image} />
                                                    }

                                                    title={myposts.std_fname}
                                                    subheader={myposts.aw_std_id}
                                                />
                                            </Col>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className="btn-icon btn-2" style={{ backgroundColor: "white", color: "black", border: "none" }} type="button">
                                                    <span className="btn-inner--icon">
                                                        <MoreVertIcon />
                                                    </span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem divider />
                                                    <DropdownItem style={{ fontSize: "16px" }} href={"/mypackage/" + myposts.aw_id}>แพ็คเก็จ</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem style={{ fontSize: "16px" }} href={"/myphotos/" + myposts.aw_id}>รูปภาพ</DropdownItem>
                                                    <DropdownItem divider />
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Row>
                                        <CardImg className="imgwork" src={myposts.w_img_name} />
                                        <CardBody >
                                            <Row >
                                                <Col sm="12" className="textname-mypost">
                                                    <b><CardText className="nameMyPost">{myposts.aw_name}</CardText></b>
                                                    <CardText className="nameMyPost"><b style={{ color: "#ff5722" }}>ประเภทงาน</b>
                                                        : <b>{myposts.main_cate_name}</b>{' '}
                                                        , <b style={{ color: "orange" }}>{myposts.sub_cate_name}</b>
                                                    </CardText>
                                                </Col>

                                            </Row>
                                            <CardText><b style={{ color: "#ff5722" }}>สถานะ</b>
                                                <b> : {myposts.aw_status}
                                                </b>
                                            </CardText>
                                            <hr />
                                            <Row>
                                                <Col sm="6">
                                                    <Editpost aw_id={myposts.aw_id} />
                                                </Col>
                                                <Col sm="6">
                                                    <Editcateg aw_id={myposts.aw_id} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card> <br /><br />
                                </Col>
                            )
                        }

                    })}
                </Row>
            </Container>
        </>
    )
}

export default Mypost
