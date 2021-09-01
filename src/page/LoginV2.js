import React, { useState } from 'react'
// import { Card, Col, Row } from 'reactstrap'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RePass from '../components/resetPass';
import axios from 'axios'
import Api from '../api/Api';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '23px',
        height: '100vh',
        // marginBottom:'-100px'
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

const LoginV2 = () => {
    const datastatus = {
        status: localStorage.getItem('status')
    }
    const [data, setdata] = useState({
        User_id: "",
        User_password: ""
    })
    const handleChange = (e) => {
        let { name, value } = e.target;
        setdata((prev) => ({ ...prev, [name]: value }))
    }
    const Login = (e) => {
        e.preventDefault()
        axios.post(Api('login_user'), data)
            .then(res => {
                if (res.data.message === "success") {
                    localStorage.setItem('User_id', res.data.username);
                    localStorage.setItem('fname', res.data.fname);
                    localStorage.setItem('lname', res.data.lname);
                    localStorage.setItem('image', res.data.img);
                    localStorage.setItem('status', res.data.status);
                    window.location.reload();
                }
                else if (res.data.message === 'Fail Login') {
                    Swal.fire({
                        icon: 'error',
                        title: 'รหัสผ่านไม่ถูกต้อง',
                        text: ' กรุณากรอกใหม่อีกครั้ง',
                        confirmButtonText: 'ตกลง'
                        
                    })
                }
                else {
                    alert("err")
                }
            })

    }
    const classes = useStyles();

    if (datastatus.status === null) {
        return (
            <>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                เข้าสู่ระบบ
                        </Typography>
                            <form className={classes.form} noValidate onSubmit={Login} >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="ชื่อผู้ใช้ / รหัสนักศึกษา"
                                    name="User_id"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => handleChange(e)} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="User_password"
                                    label="รหัสผ่าน"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => handleChange(e)}
                                />
                               
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    type="submit"
                                >
                                    เข้าสู่ระบบ
                            </Button>
                                <Grid container>
                                    <Grid item xs>

                                        <RePass />
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" style={{fontSize:"16px"}} >
                                            {"หากไม่มีบัญชี ลงทะเบียน"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    } else {
        window.location.assign("/")
    }
}
export default LoginV2
