import axios from 'axios';
import React, { useEffect, useState } from 'react'
import confirm from "reactstrap-confirm";
import {
    Button, Card, Col, Row
} from 'reactstrap';
import Swal from 'sweetalert2';
import Api from '../../api/Api';
import '../../css/cardhome.css';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';


const useStyles = makeStyles({
    root: {


    },
    media: {
        height: 140,
    },
});

const Selecpackage = ({ id }) => {

    const classes = useStyles();

    const [showdetail, setShowdetail] = useState([]);
    useEffect(() => {
        axios.get(Api('detailpost') + id)
            .then((response) => {
                setShowdetail(response.data[0])
                console.log(response.data)
            })

    }, [id]);

    const [showpackage, setPackage] = useState([]);
    useEffect(() => {
        let isMounted = true;

        axios.get(Api('getPackage') + id)
            .then((response) => {
                if (isMounted) setPackage(response.data)
            })
        return () => { isMounted = false };

    }, [id]);

    const insertWork = async (aw_name, aw_std_id, pk_name, pk_id) => {
        var dataEmp = {
            emm_user_id: localStorage.getItem('User_id'),
            emm_std_id: aw_std_id,
            emm_pk_id: pk_id,
            emm_status: "รอการตอบรับ",
        }

        let data = {
            User_id: localStorage.getItem('User_id'),
            toUser_id: aw_std_id,
            message: "สวัสดี อยากจ้างงาน" + aw_name + "ที่แพ็คเกจ" + pk_name
        }

        let data1 = {
            User_id: aw_std_id,
            toUser_id: localStorage.getItem('User_id'),
            message: "กรุณารอฟรีแลนซ์ตอบกลับข้อความ"
        }
        let result = await confirm(

            {
                title: <> Confirmation !!</>,
                message: 'คุ ณ ส น ใ จ จ้ า ง ง า น แ ล ะ ติ ด ต่ อ กั บ ฟ รี แ ล น ซ์ ห รื อ ไ ม่',
                confirmText: "ใช่",
                confirmColor: "primary",
                cancelText: "ไม่ใช่",
                cancelColor: "danger",

            });
        if (result) {

            axios.post(Api('employment'), dataEmp)
                .then((res) => {
                }
                )
            axios.post(Api('message'), data)
                .then((res) => {
                    if (res.data.message === "success") {
                        axios.post(Api('message'), data1)
                    }
                })
                .then(() => {
                    Swal.fire(
                        'ดำเดินการจ้างงาน',
                        '',
                        'success'
                    )
                })
                .then(() => {
                    window.location.assign("/chat")
                })

        };
    }
    const login = () => {
        window.location.assign("/login2")
    }



    return (

        <>


            <Row className="pack-work">

                {showpackage.map((detail) => {
                    return (
                        <Col sm="4" key={detail.pk_id}>
                            <Card className={classes.root}>
                                <CardActionArea>

                                    <CardContent className="text-name">
                                        <Tabs>
                                            <Typography gutterBottom variant="h4" style={{ color: "#ff5722" }}>
                                                แพ็คเกจ
                                            </Typography>
                                        </Tabs>
                                        {detail.pk_name}
                                        <hr />

                                        <Typography variant="body2" component="p">
                                            {detail.pk_detail}
                                            <br />ระยะเวลาในการทำงาน  {detail.pk_time_period}
                                            <br /><b>ราคาของแพ็คเกจ </b>
                                            <b style={{ color: "#ff5722" }}>{detail.pk_price}</b>
                                            <b> บาทถ้วน </b>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="btn-hire">
                                    {localStorage.getItem('status') === 'Admin' ? <span></span>
                                        :
                                        localStorage.getItem('status') === 'Student' ? <b style={{ color: 'tomato' }}>!!ไม่สามารถจ้างงานได้เพราะเป็นฟรีแลนซ์</b>
                                            :
                                            localStorage.getItem('User_id') === null ? <Button style={{ backgroundColor: '#ff5722' }}
                                                onClick={() => login()}>
                                                กรุณาเข้าสู่ระบบ</Button>
                                                :
                                                localStorage.getItem('User_id') === showdetail.aw_std_id ? <span></span>
                                                    :
                                                    <Button id="employ" style={{ backgroundColor: '#ff5722' }}
                                                        onClick={() => insertWork(showdetail.aw_name, showdetail.aw_std_id, detail.pk_name, detail.pk_id)}>
                                                        สนใจจ้าง
                                                    </Button>}
                                </CardActions>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <br />

        </>
    )

}

export default Selecpackage
