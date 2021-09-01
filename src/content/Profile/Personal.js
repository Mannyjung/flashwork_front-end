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
import Modals from './ModalFl';
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
        paddingTop: '100%', // 16:9
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

const initProfile = {
    std_fname: "",
    std_lname: "",
    std_phone: "",
    std_description: "",
}
const iniImage = {

    std_image: "",
};

const Personal = ({ id }) => {
    const classes = useStyles();
    const [student, setStudent] = useState(initProfile);
    const [studentimg, setStudentimg] = useState(iniImage);


    useEffect(() => {
        axios.get(Api('getStudent') + id)
            .then((response) => {
                setStudent(response.data[0])
            })
    }, [id]);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setStudent({ ...student, [name]: value })
    };

    const saveProfile = () => {
        let err = ""
        if (!student.std_fname) {
            err = "กรุณากรอกชื่อผู้ใช้"
            document.getElementById('chkstd_fname').innerHTML = err;
            return false;
        }
        if (/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(student.std_fname)) {
            err = "ห้ามใช้อักขระพิเศษในชื่อ"
            document.getElementById('chkstd_fname').innerHTML = err;
            return false;
        }
        if (!student.std_lname) {
            err = "กรุณากรอกนามสกุล"
            document.getElementById('chkstd_lname').innerHTML = err
            return false;
        }
        if (/[!@#$%^&*()_+\-={};':"|,.<>?]/.test(student.std_lname)) {
            err = "ห้ามใช้อักขระพิเศษในนามสกุล"
            document.getElementById('chkstd_lname').innerHTML = err;
            return false;
        }

        if (!student.std_phone) {
            err = "กรุณากรอกเบอร์"
            document.getElementById('chkstd_phone').innerHTML = err
            return false;
        }
        if (student.std_phone.length !== 10) {
            err = "กรุณากรอกให้ครบ 10 ตัว"
            document.getElementById('chkstd_phone').innerHTML = err
            return false;
        }


        var data = {
            std_fname: student.std_fname,
            std_lname: student.std_lname,
            std_phone: student.std_phone,
            std_description: student.std_description,
        }
        axios.put(Api('getStudent') + id, data)
            .then((response) => {
                setStudent({ ...student, data });
                Swal.fire(
                    'แก้ไขข้อมูลเสร็จสิ้น?',
                    '',
                    'success'
                )

            }).then(() => {
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);

            });
    }



    const FILE_SIZE = 800 * 600;
    const uploadFileToFirebase = (file) => {
        const userId = "STD";
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
        initialValues: iniImage,
        validationSchema: yup.object().shape({
            std_image: yup.mixed().test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                if (file) {
                    return file.size <= FILE_SIZE;
                } else {
                    return true;
                }
            })

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
            std_image: imageURL,
        }

        axios.put(Api('editimgfree') + id, data)
            .then((response) => {
                setStudentimg({ ...studentimg, data });
                Swal.fire(
                    'แก้ไขข้อมูลเสร็จสิ้น',
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
        <>



            <Container style={{ marginTop: "3%", marginLeft: "15%" }}>
                <h1>โปรไฟล์</h1>
                {/* </Container> */}
                {/* {student.map((std_data) => {
                return ( */}
                {/* <Container style={{ marginTop: "3%" }}> */}

                <Row>
                    <Col md={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={student.std_image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h7" color="textSecondary" component="p" align="center">
                                        <p>ชื่อผู้ใช้ :{" "}{student.std_id}</p>
                                        <p>ชื่อ-นามสกุล :{" "}{student.std_fname}{" "}{student.std_lname}</p>
                                        <p>อีเมลล์ :{" "}{student.std_email}</p>
                                        <p>เบอร์โทรศัพท์ :{" "}{student.std_phone}</p>
                                        <p>{student.major_name}{" "}{student.fac_name} </p>
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
                                                    name="std_image"
                                                    id="std_image"
                                                    onChange={(event) => {
                                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                                    }}

                                                />
                                                {formik.errors.std_image && formik.touched.std_image && (
                                                    <p style={{ color: "red" }}>{formik.errors.std_image}</p>
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
                                                <Input type="text" name="std_id" id="std_id" onChange={handleInputChange} value={student.std_id} readOnly />

                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="std_email">อีเมลล์</Label>
                                                <Input type="email" name="std_email" id="std_email" onChange={handleInputChange} value={student.std_email} readOnly />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="fname">ชื่อ</Label>
                                                <Input type="text" name="std_fname" id="std_fname" onChange={handleInputChange} value={student.std_fname} />
                                            </FormGroup>
                                            <span className="err" name="err" id="chkstd_fname"></span>
                                            <p></p>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="std_lname">นามสกุล</Label>
                                                <Input type="text" name="std_lname" id="std_lname" onChange={handleInputChange} value={student.std_lname} />
                                            </FormGroup>
                                            <span className="err" name="err" id="chkstd_lname"></span>
                                            <p></p>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="fname">เบอร์โทรศัพท์</Label>
                                                <Input type="number" name="std_phone" id="std_phone" onChange={handleInputChange} value={student.std_phone} placeholder="กรอกเบอร์โทรศัพท์" />
                                            </FormGroup>
                                            <span className="err" name="err" id="chkstd_phone"></span>
                                            <p></p>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <p></p>
                                                <Modals id={id} pass={student.std_password} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="exampleText">คำอธิบาย</Label>
                                        <Input
                                            type="textarea"
                                            name="std_description"
                                            id="std_description"
                                            value={student.std_description}
                                            onChange={handleInputChange}
                                        />

                                    </FormGroup>

                                    <Button className={classes.button} size="lg" block onClick={saveProfile}>แก้ไขข้อมูลส่วนตัว</Button>
                                </Form>
                            </Container>
                        </Card>

                    </Col>
                </Row>
            </Container>
            {/* );
            })} */}
        </>
    )
}

export default Personal
