import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { storage } from "../../firebase";
import Api from '../../api/Api';
import ModalEmp from './ModalEmp';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 360,
    },
    rootNew: {
        maxWidth: 800,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button: {
        backgroundColor: "#ff5722",
        border: "none"
    },
}));
const PersonalEmp = ({ username }) => {
    const initProfile = {
        em_fname: "",
        em_lname: "",
        em_phone: "",
    }

    const initEmpimg = {
        em_fname: "",
    }


    const classes = useStyles();
    const [employer, setEmployer] = useState(initProfile);
    const [employerimg, setEmployerimg] = useState(initEmpimg);
    useEffect(() => {
        axios.get(Api('getEmp') + username)
            .then((response) => {
                setEmployer(response.data[0])
            })
    }, [username]);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setEmployer({ ...employer, [name]: value })
    };
    const saveProfile = () => {

        let err = ""
        if (!employer.em_fname) {
            err = "กรุณากรอกชื่อผู้ใช้"
            document.getElementById('chk-em_fname').innerHTML = err;
            return false;
        }
        if (/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(employer.em_fname)) {
            err = "ห้ามใช้อักขระพิเศษในชื่อ"
            document.getElementById('chk-em_fname').innerHTML = err;
            return false;
        }
        if (!employer.em_lname) {
            err = "กรุณากรอกนามสกุล"
            document.getElementById('chk-em_lname').innerHTML = err
            return false;
        }
        if (/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(employer.em_lname)) {
            err = "ห้ามใช้อักขระพิเศษในนามสกุล"
            document.getElementById('chk-em_lname').innerHTML = err;
            return false;
        }
        if (!employer.em_phone) {
            err = "กรุณากรอกเบอร์"
            document.getElementById('chk-em_phone').innerHTML = err
            return false;
        }
        if (employer.em_phone.length !== 10) {
            err = "กรุณากรอกให้ครบ 10 ตัว"
            document.getElementById('chk-em_phone').innerHTML = err
            return false;
        }

        var data = {
            em_fname: employer.em_fname,
            em_lname: employer.em_lname,
            em_phone: employer.em_phone,
        }
        axios.put(Api('getEmp') + username, data)
            .then((response) => {
                setEmployer({ ...employer, data });
                Swal.fire(
                    'แก้ไขข้อมูลเสร็จสิ้น?',
                    '',
                    'success'
                ).then(function () {
                    window.location.reload()

                })

            })
            .catch((error) => {
                console.log(error);

            });
    }

    //---------------------------
    const uploadFileToFirebase = (file) => {
        const userId = "EMP";
        const timestamp = Math.floor(Date.now() / 1000);
        const newName = userId + "_" + timestamp;
        const uploadTask = storage.ref(`profire/${newName}`).put(file);
        uploadTask.on("state_changed", (snapshot) => {
        },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("profire")
                    .child(newName)
                    .getDownloadURL()
                    .then((imageURL) => {
                        saveProduct(imageURL);
                    });
            }
        )
    }




    const formik = useFormik({
        initialValues: initEmpimg,
        validationSchema: yup.object().shape({


        }),
        onSubmit: (values) => {
            if (values.file) {
                uploadFileToFirebase(values.file)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเพิ่มรูปภาพ',

                    confirmButtonText: 'ตกลง'

                })
            }
        },
    });

    const saveProduct = (imageURL) => {
        var data = {
            em_image: imageURL,
        }

        axios.put(Api('editimgemp') + username, data)
            .then((response) => {
                setEmployerimg({ ...employerimg, data });
                Swal.fire(
                    'แก้ไขข้อมูลเสร็จสิ้น?',
                    '',
                    'success'
                )
                    .then(function () {
                        window.location.reload()

                    })
            })
            .catch((error) => {
                console.log(error);

            });
    };

    return (
        <div>
            <Container style={{ marginTop: "3%", marginLeft: "15%" }}>
                <h1 className="profileemp">โปรไฟล์</h1>
            </Container>
            {/* {student.map((em_data) => {
                return ( */}
            <Container style={{ marginTop: "3%" }}>
                <Row>
                    <Col md={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={employer.em_image}
                                    title=""
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h7" color="textSecondary" component="p" align="center">
                                        <p>ชื่อผู้ใช้ :{" "}{employer.em_username}</p>
                                        <p>ชื่อ-นามสกุล :{" "}{employer.em_fname}{" "}{employer.em_lname}</p>
                                        <p>อีเมลล์ :{" "}{employer.em_email}</p>
                                        <p>เบอร์โทรศัพท์ :{" "}{employer.em_phone}</p>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>

                                <Form onSubmit={formik.handleSubmit}>
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <Input
                                                    type="file"
                                                    name="em_image"
                                                    id="em_image"
                                                    onChange={(event) => {
                                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                                    }}

                                                />
                                                {formik.errors.em_image && formik.touched.em_image && (
                                                    <p style={{ color: "red" }}>{formik.errors.em_image}</p>
                                                )}
                                            </Col>
                                            <Col className="">
                                                <Button type="submit" className="btn btn-success float-right" >เปลี่ยนโปรไฟล์</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Form>
                            </CardActions>
                        </Card>
                    </Col>


                    <Col md={8}>
                        <Card className={classes.rootNew}>
                            <Container style={{ marginTop: "3%", marginBottom: "3%" }}>
                                <Form>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="username">ชื่อผู้ใช้</Label>
                                                <Input type="text" name="em_username" id="em_username" onChange={handleInputChange} value={employer.em_username} readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">อีเมลล์</Label>
                                                <Input type="email" name="em_email" id="em_email" onChange={handleInputChange} value={employer.em_email} readOnly />
                                                <span className="err" name="err" id="chk-em_lname"></span>
                                            <p></p>
                                           </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="fname">ชื่อ</Label>
                                                <Input type="text" name="em_fname" id="em_fname" onChange={handleInputChange} value={employer.em_fname} />
                                         
                                                <span className="err" name="err" id="chk-em_fname"></span>
                                        
                                            </FormGroup>
                                            <p></p>
                                         
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="em_lname">นามสกุล</Label>
                                                <Input type="text" name="em_lname" id="em_lname" onChange={handleInputChange} value={employer.em_lname} />
                                                <span className="err" name="err" id="chk-em_lname"></span>
                                        
                                            </FormGroup>
                                            <p></p>
                                            
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="fname">เบอร์โทรศัพท์</Label>
                                                <Input type="text" name="em_phone" id="em_phone" onChange={handleInputChange} value={employer.em_phone} placeholder="กรอกเบอร์โทรศัพท์" />
                                                <span className="err" name="err" id="chk-em_phone"></span>
                                           
                                            </FormGroup>
                                            <p></p>
                                          
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <p></p>
                                                <ModalEmp id={username} pass={employer.em_password} />
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Button style={{marginTop:"2%"}} className={classes.button} size="lg" block onClick={saveProfile}>แก้ไขข้อมูลส่วนตัว</Button>
                                </Form>
                            </Container>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PersonalEmp
