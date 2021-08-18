import React, { useState } from 'react';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(57),
        },
    },
}));
const ModalExample = (props) => {
    const {
        buttonLabel = "ลืมรหัสผ่าน",
    } = props;
    const getemail = {
        User_email: ""
    };
    const [modal, setModal] = useState(false);
    const [email, setemail] = useState(getemail)
    const InputMail = (e) => {
        let { name, value } = e.target;
        setemail({ ...email, [name]: value })
    };
    const toggle = () => setModal(!modal);
    const sendmail = () => {
        axios.post("https://flashworkbackend.xyz/flashwork_api/public/forgetpassword", email)
            .then(res => {
                if (res.data.messages === "success") {
                    Swal.fire(
                        'ยื่นคำขอสำเร็จ',
                        'ส่งข้อความไปยังอีเมล์เรียบร้อย'
                    )
                        .then(function () {
                            setemail(getemail)
                            window.location.reload();
                        });


                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่มีอีเมลนี้อยู่',
                        text: ' กรุณากรอกใหม่อีกครั้ง',
                        confirmButtonText: 'ตกลง'

                    })
                }
            })
    }
    const classes = useStyles();
    return (
        <div>
            <Button color="none" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} style={{ marginTop: '300px' }}>
                <ModalHeader toggle={toggle}>ลืมรหัสผ่าน</ModalHeader>
                <ModalBody>
                    <Label>กรุณากรอกใส่ อีเมล์ เผื่อตั้งค่ารหัสผ่านใหม่ </Label>
                    <form className={classes.root} noValidate autoComplete="off" >
                        <TextField id="outlined-basic" label="อีเมล์" variant="outlined" fullWidth type="email" name="User_email" onChange={InputMail} />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={sendmail} >ตกลง</Button>{' '}
                    <Button color="secondary" onClick={toggle}>เลิกทำ</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;