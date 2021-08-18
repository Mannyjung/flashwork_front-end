import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import PasswordStrengthBar from 'react-password-strength-bar';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import Api from '../api/Api';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '23px',
        height: '100vh',
        marginBottom: '0px',
        fontFamily: 'Prompt sans-serif',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/202)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


// const resetPassword = () => {
// }

const LoginV2 = () => {
    const classes = useStyles();
    let { us } = useParams();
    let { id } = useParams();
    const defpassword = {
        password: ""
    };
    const [password, setpassword] = useState(defpassword)
    const [conpassword, setconpassword] = useState(defpassword)
    const [score, setscore] = useState(0)
    const changpass = () => {
        let err = ""
        if (!password) {
            err = "กรุณากรอกรหัส"
            document.getElementById('password').innerHTML = err
            return false;
        }
        if (score <= 2) {
            err = "กรุณากรอกรหัสให้อยู่ระดับที่ปลอดภัย"
            document.getElementById('password').innerHTML = err
            return false;
        }

        if (password !== conpassword) {
            err = "กรุณาใส่รหัสให้ตรงกัน"
            document.getElementById('password').innerHTML = err
            return false;
        } else {
            let data = {
                user: us,
                id: id,
                password: password,
            }
            axios.post(Api('resetpassword'), data)
                .then(res => {
                    if (res.data.messages === "success") {
                        Swal.fire(
                            'เปลี่ยนรหัสผ่านเรียบร้อย',
                            'success'
                        )
                        setpassword(defpassword);
                        setconpassword(defpassword);
                        window.location.assign("/")
                    }
                    
                    else {
                        Swal.fire(
                            'ไม่สามารถใช้งานหน้านี้ได้',
                            'warning'
                        )
                        window.location.assign("/")
                    }
                })
        }
    }
    if (us !== 'unknow' && id !== 'unknow') {
        return (
            <>
            
                <Grid container component="main" style={{ marginTop:"5%" }} className={classes.root} >
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                เปลียนรหัสผ่าน
                        </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="อีเมล์"
                                    name="email"
                                    defaultValue={us}
                                    autoComplete="email"
                                    disabled
                                    autoFocus
                                />


                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="รหัสผ่าน"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={e => setpassword(e.target.value)}
                                />

                                <PasswordStrengthBar password={password} onChangeScore={e => setscore(e)} />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="conpassword"
                                    label="ยืนยันรหัสผ่าน"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={e => setconpassword(e.target.value)}
                                />
                                <span className="err" name="err" id="password"></span>
                                <span className="err" name="err" id="conpassword"></span>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={changpass}
                                >
                                    ยืนยัน
                                </Button>


                            </form>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            
            <center style={{ marginTop:"5%" }}>
                <h1>รหัสการใช้งานหมดอายุ</h1>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                >
                    ยืนยัน
                                </Button>
            </center>
        )
    }
}

export default LoginV2
