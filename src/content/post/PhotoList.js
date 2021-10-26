import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container, Input, Label, Button, Progress, Form, Card, Row, Col } from 'reactstrap';
import { GridList, GridListTile, GridListTileBar, IconButton, ListSubheader, MenuItem } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { storage } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import '../../css/cardhome.css'
import Api from '../../api/Api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));
const PhotoList = ({ id }) => {
    const [showdetail, setShowdetail] = useState([]);
    useEffect(() => {
        axios.get(Api('PIC') + id)
            .then((response) => {
                setShowdetail(response.data)
            })
    }, [id]);
    const classes = useStyles();
    const deletePhotos = async (w_img_id) => {
        axios.delete(Api('deletePhotos') + w_img_id)
            .then((response) => {
                Swal.fire(
                    'ลบข้อมูลสำเร็จ',
                    '',
                    'success'
                )
                    .then(() => {
                        window.location.reload();
                    })
            })
    };
    const img = {
        file: [],
    };

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

    const formik = useFormik({

        initialValues: img,
        validationSchema: yup.object().shape({

        }),
        onSubmit: async (values) => {
            if (values.file) {
                const urls = await uploadFileToFirebase(values.file);
                AddPhotosMore(urls);
            }
            else {
                AddPhotosMore("")
            }
        },
    });

    const AddPhotosMore = (imgs) => {
        let data = {
            w_aw_id: id,
            w_img_name: imgs,
        }
        axios.post(Api('addphotos'), data)
            .then((response) => {
                if (response.data.messages === "success") {
                    Swal.fire(
                        'บันทึกข้อมูลเรียบร้อย',
                        '',
                        'success'
                    )
                        .then(function () {
                            window.location.reload()

                        })
                } else if (response.data.messages === " ") {
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
    return (
        <>
            <Container>
                <h1 style={{ marginTop: "5%" }}>รูปภาพของงาน</h1>

                <Row>
                    <Col sm="12">
                        <Form onSubmit={formik.handleSubmit}>


                            <Row >
                                <Col sm="5" className="input-photo">


                                    <Card className="card-photo">
                                        <Label className="label-photo">เพิ่มรูปภาพ</Label>
                                        <Row>
                                            <Col sm="1"></Col>
                                            <Col sm="5" >
                                                <Input
                                                    type="file"
                                                    name="file"
                                                    className="btn-sty"
                                                    multiple
                                                    onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files); }}
                                                />
                                                {progress !== 0 && (
                                                    <Progress value={progress}>{progress}%</Progress>
                                                )}
                                            </Col>
                                            <Col sm="5">
                                                <Button block color="success" size="sm" type="submit">บันทึก</Button>
                                            </Col>
                                        </Row>




                                    </Card>



                                </Col>

                                <Col sm="7" className="btn-photo">

                                    <div className={classes.root}>
                                        <GridList cellHeight={180} className={classes.gridList}>
                                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                                <ListSubheader component="div"></ListSubheader>
                                            </GridListTile>

                                            {showdetail.map((tile) => (
                                                <GridListTile key={tile.w_aw_id}>
                                                    <img src={tile.w_img_name} alt={tile.title} />
                                                    <GridListTileBar
                                                        title={tile.title}
                                                        //subtitle={<span>by: {tile.author}</span>}
                                                        actionIcon={
                                                            <IconButton
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true"
                                                                className={classes.icon}
                                                            >

                                                                <MenuItem onClick={() => deletePhotos(tile.w_img_id)} style={{ color: "white" }}>
                                                                    ลบรูป
                                                                </MenuItem>
                                                            </IconButton>
                                                        }
                                                    />
                                                </GridListTile>

                                            ))}
                                        </GridList>
                                    </div>
                                </Col>

                            </Row>




                        </Form>

                    </Col>
                </Row>

            </Container>




        </>
    )
}

export default PhotoList
