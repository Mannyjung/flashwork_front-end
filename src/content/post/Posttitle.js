import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import '../../css/img.css';
import { Container, Card, FormGroup, Input, Label, Row, Col, Breadcrumb, BreadcrumbItem, Button, Progress, Form } from 'reactstrap';
import axios from 'axios'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { storage } from "../../firebase";
import '../../css/post.css';
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import Api from '../../api/Api';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));
const Posttitle = () => {

    const Workdetail = {
        User_id: localStorage.getItem('User_id'),
        Work_name: "",
        Work_detail: "",
        Pk_name: "",
        Pk_detail: "",
        Pk_price: "",
        timeperiod: "",
        file: [],
    };

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

    const classes = useStyles();
    const [progress, setProgress] = useState(0);


    const uploadFileToFirebase = async (files) => {
        let array = Array.from(files)
        const promises = [];

        array.forEach(file => {

            promises.push(
                new Promise((resolve, reject) => {
                    const userId = localStorage.getItem('User_id');
                    const newName = uuidv4();
                    const uploadTask = storage.ref(`${userId}/image/${newName}`).put(file);
                    uploadTask.on("state_changed", (snapshot) => {

                        const uploadProgress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(uploadProgress);
                    },
                        reject,
                        () => {
                            storage
                                .ref(userId + "/image")
                                .child(newName)
                                .getDownloadURL()
                                .then((imageURL) => {
                                    resolve(imageURL);
                                })
                        })
                })
            )

        })
        let result = await Promise.all(promises);
        return result;
    }



    // const SUPPORTED_TYPE = [
    //     "image/jpg",
    //     "image/jpeg",
    //     "image/png",
    //     "image/gif",
    //     "application/pdf",
    // ]
    const formik = useFormik({
        // initialValues: initProduct,
        initialValues: Workdetail,
        validationSchema: yup.object().shape({
            // Work_name: yup.string().required("กรุณากรอกข้อมูลชื่องาน"),
            // Work_detail: yup.string().required("กรุณากรอกรายละเอียดงาน"),
            // Pk_name: yup.string().required("กรุณากรอกข้อมูลชื่อแพ็คเกจ"),
            // Pk_detail: yup.string().required("กรุณากรอกละเอียดแพ็คเกจ"),
            // timeperiod: yup.string().required("กรุณากรอกระยะเวลาทำงาน"),
            // Pk_price: yup
            //     .number("กรอกเป็นตัวเลขเท่านั้น")
            //     .positive("ต้องมีค่าเป็นบวก")
            //     .required("กรุณากรอกราคาแพ็คเกจ"),
        }),
        onSubmit: async (values) => {
            if (values.file) {
                const urls = await uploadFileToFirebase(values.file);
                saveProduct(urls);
            }
            else {
                saveProduct("")
            }
        },
    });


    const saveProduct = (imgs) => {
        let data = {
            User_id: localStorage.getItem('User_id'),
            Work_name: formik.values.Work_name,
            Work_detail: formik.values.Work_detail,
            Work_category: sub_cate_id,
            Pk_name: formik.values.Pk_name,
            Pk_detail: formik.values.Pk_detail,
            Pk_price: formik.values.Pk_price,
            timeperiod: formik.values.timeperiod,
            Work_img: imgs,
        }


        axios.post(Api('postwork'), data)
            .then((response) => {

                if (response.data.messages === "success") {
                    Swal.fire(
                        'บันทึกข้อมูลเรียบร้อย',
                        '',
                        'success'
                    )
                        .then(function () {
                            window.location.assign("/")

                        })
                } else if (response.data.messages === "FailPost") {
                    Swal.fire(
                        'กรุณากรอกข้อมูลให้ครบ',
                        '',
                        'warring'
                    )
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (localStorage.getItem('User_id') == null) {


        window.location.assign("/login2")


    }
    else {
        return (

            <>
                <Container style={{ maxWidth: "30%" }} className="mt-5">
                    <Breadcrumb className="text-center">
                        <BreadcrumbItem active tag="h1" style={{ marginLeft: "35%", color: "black" }} >เพิ่มงาน</BreadcrumbItem>
                    </Breadcrumb>
                </Container>

                <Container style={{ maxWidth: "80%" }}>
                    <Card>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col sm={12}>
                                    <Breadcrumb>
                                        <BreadcrumbItem active tag="h4" style={{ color: "black" }}>เนื้อหา</BreadcrumbItem>
                                    </Breadcrumb>
                                    <Container style={{ maxWidth: "95%" }}>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom >
                                            <Grid container spacing={2} style={{ color: "black" }}>
                                                <Grid item xs={12} sm={6} >
                                                    <FormGroup >
                                                        <Label for="exampleText">ชื่องาน</Label>
                                                        <Input
                                                            type="text"
                                                            name="Work_name"
                                                            id="Work_name"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.Work_name}
                                                        />
                                                        {formik.errors.Work_name && formik.touched.Work_name && (
                                                            <p style={{ color: "red" }}>{formik.errors.Work_name}</p>
                                                        )}
                                                    </FormGroup>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">หมวดหมู่หลัก</Label>
                                                        <Input type="select" name="main_cate_id" id="main_cate_id" onChange={selectsub} value={formik.values.main_cate_id}>
                                                            <option value='0'>เลือกหมวดหมู่</option>
                                                            {maincate.map((maincate) => {
                                                                return (
                                                                    <option key={maincate.main_cate_id} value={maincate.main_cate_id}>{maincate.main_cate_name} </option>
                                                                )
                                                            })
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Grid>

                                                {selectcate === 0 ? ("") : (
                                                    <Grid item xs={12} sm={6}>

                                                        < FormGroup >
                                                            <Label for="exampleSelect">หมวดหมู่ย่อย</Label>
                                                            <Input type="select" name="sub_cate_id" id="exampleSelect" onChange={e => setsub_cate_id(e.target.value)} value={formik.values.sub_cate_id}>
                                                                <option value='0'>เลือกหมวดหมู่</option>
                                                                {subcate.map((subcate) => {
                                                                    return (
                                                                        <option key={subcate.sub_cate_id} value={subcate.sub_cate_id}>{subcate.sub_cate_name} </option>
                                                                    )
                                                                })
                                                                }
                                                            </Input>

                                                        </FormGroup>
                                                    </Grid>
                                                )}

                                                <Grid item xs={6}>
                                                    <FormGroup>
                                                        <Label for="exampleText">รายละเอียด</Label>
                                                        <Input
                                                            type="textarea"
                                                            name="Work_detail"
                                                            id="exampleText"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.Work_detail}
                                                        />
                                                        {formik.errors.Work_detail && formik.touched.Work_detail && (
                                                            <p style={{ color: "red" }}>{formik.errors.Work_detail}</p>
                                                        )}
                                                    </FormGroup>
                                                </Grid>


                                               
                                            </Grid>

                                        </Typography >
                                    </Container>
                                    {/* เนื้อหา */}

                                    {/* แพ็คแก็ต */}
                                    <Breadcrumb>
                                        <BreadcrumbItem active tag="h4" style={{ color: "black" }}>แพ็คเก็ต</BreadcrumbItem>
                                    </Breadcrumb>
                                    <Container style={{ maxWidth: "95%" }}>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            <Grid container spacing={2} style={{ color: "black" }}>
                                                <Grid item xs={12} sm={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">ชื่อแพ็คเก็ต</Label>
                                                        <Input
                                                            type="text"
                                                            name="Pk_name"
                                                            id="Pk_name"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.Pk_name}
                                                        />
                                                        {/* <span className="err" name="err" id="Pk_name"></span> */}
                                                        {formik.errors.Pk_name && formik.touched.Pk_name && (
                                                            <p style={{ color: "red" }}>{formik.errors.Pk_name}</p>
                                                        )}
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">รายละเอียด</Label>
                                                        <Input
                                                            type="text"
                                                            name="Pk_detail"
                                                            id="Pk_detail"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.Pk_detail}
                                                        />
                                                        {formik.errors.Pk_detail && formik.touched.Pk_detail && (
                                                            <p style={{ color: "red" }}>{formik.errors.Pk_detail}</p>
                                                        )}
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">ราคา</Label>
                                                        <Input
                                                            type="number"
                                                            name="Pk_price"
                                                            id="Pk_price"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.Pk_price}
                                                        />
                                                        {formik.errors.Pk_price && formik.touched.Pk_price && (
                                                            <p style={{ color: "red" }}>{formik.errors.Pk_price}</p>
                                                        )}
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">ระยะเวลาในการทำงานโดยประมาณ</Label>
                                                        <Input type="select" name="timeperiod" id="timeperiod" onChange={formik.handleChange} value={formik.values.timeperiod}>
                                                            <option value=" ">เลือกเวลา</option>
                                                            <option value="ภายใน 3 วัน">3 วัน</option>
                                                            <option value="ภายใน 7 วัน">7 วัน</option>
                                                            <option value="ภายใน 14 วัน">14 วัน</option>
                                                            <option value="ภายใน 21 วัน">21 วัน</option>
                                                            <option value="ภายใน 30 วัน">30 วัน</option>

                                                        </Input>
                                                        {formik.errors.timeperiod && formik.touched.timeperiod && (
                                                            <p style={{ color: "red" }}>{formik.errors.timeperiod}</p>
                                                        )}
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>

                                        </Typography >
                                    </Container>
                                    {/* แพ็คแก็ต */}


                                    <Row>
                                        {/* รูป */}
                                        <Col >
                                            <FormGroup style={{ color: "black" }}>
                                                <Breadcrumb>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <BreadcrumbItem active tag="h4" style={{ color: "black" }}>รูปภาพ  </BreadcrumbItem>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Input type="file" name="file" className="btn-sty" multiple onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files); }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Breadcrumb>
                                                <Container>

                                                </Container>
                                                {progress !== 0 && (
                                                    <Progress value={progress}>{progress}%</Progress>
                                                )}
                                                {formik.errors.file && formik.touched.file && (
                                                    <p style={{ color: "red" }}>{formik.errors.file}</p>
                                                )}
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: "25%" }}>
                                        <Col md={4}>
                                            <Button size="lg" block>ยกเลิก</Button>
                                        </Col>
                                        <Col md={4}>
                                            <Button block color="success" size="lg" type="submit">บันทึก</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                        <br />
                    </Card>
                </Container>
                <br />  <br />
            </>
        );
    }
};

export default Posttitle
