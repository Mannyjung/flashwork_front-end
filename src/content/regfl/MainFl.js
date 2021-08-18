import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonalInfo from './PersonalInfo'
import JobDetails from './JobDetails'
import AllInfo from './AllInfo'
import Bg from '../../img/free.jpg'
import { Container, Progress } from 'reactstrap'
import '../../css/regfree.css'
import { Card, CardImg, CardImgOverlay, CardHeader, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import Api from '../../api/Api'
const StepForm1 = () => {
    const setuser = {
        User_id: "",
        firstName: "",
        lastName: "",
        conPassword: "",
        password: "",
        majors: 0
    };
    const [Userprofile, setUserProfile] = useState(setuser)
    const [otp, setotp] = useState("")
    const [score, setscore] = useState(0)
    const [step, setstep] = useState(1)
    const User_email = Userprofile.User_id + "@webmail.npru.ac.th";
    const [major, setmajor] = useState([])

    useEffect(() => {
        axios.get(Api('selectmajor'))
            .then((res) => {
                setmajor(res.data);
            });
    }, []);
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setUserProfile({ ...Userprofile, [name]: value })
    }

    const nextStep = () => {
        let err = ""
        if (!Userprofile.User_id) {
            err = "กรุณากรอกรหัสนักศึกษา"
            document.getElementById('User_id').innerHTML = err;
            return false;
        }
        if (/[a-zA-Zก-ฮ!@#$%^&*()_+\-={};':"|,.<>?]/.test(Userprofile.User_id)) {
            err = "กรุณากรอกรหัสนักศึกษาให้ถูกต้อง"
            document.getElementById('User_id').innerHTML = err;
            return false;
        }
        if (Userprofile.User_id.length < 9) {
            err = "กรุณากรอกรหัสนักศึกษาให้ครบ"
            document.getElementById('User_id').innerHTML = err;
            return false;
        }
        if (Userprofile.majors === 0) {
            err = "กรุณาเลือกประเภทสาขาที่เรียน"
            document.getElementById('majors').innerHTML = err
            return false;

        }

        if (!Userprofile.firstName) {
            err = "กรุณากรอกชื่อจริง"
            document.getElementById('firstName').innerHTML = err
            return false;
        }
        if (!Userprofile.lastName) {
            err = "กรุณากรอกนามสกุล"
            document.getElementById('lastName').innerHTML = err
            return false;
        }

        if (!Userprofile.password) {
            err = "กรุณากรอกรหัสผ่าน"
            document.getElementById('password').innerHTML = err
            return false;
        }
        if (score <= 2) {
            err = "กรุณากรอกรหัสให้อยู่ระดับที่ปลอดภัย"
            document.getElementById('password').innerHTML = err
            return false;
        }
        if (!Userprofile.conPassword) {
            err = "กรุณากรอกรหัสให้ตรงกัน"
            document.getElementById('password').innerHTML = err
            return false;
        }

        if (Userprofile.password !== Userprofile.conPassword) {
            err = "กรุณาใส่รหัสให้ตรงกัน"
            document.getElementById('password').innerHTML = err
            return false;
        }

        setstep(step + 1);
    }

    const nextStep2 = () => {
        let data = {
            User_id: Userprofile.User_id,
            User_email: User_email,
        }
        axios.post(Api('Verifyregiste'), data)
            .then(res => {
                if (res.data.messages === "Dupicate Member") {
                    Swal.fire(
                        'ชื่อผู้งานนี้มีอยู่เเล้ว',
                        '',
                        'warning'
                    )
                    setUserProfile(setuser)
                    setstep(step - 1);
                }
                else if (res.data.messages === 'success') {
                    setstep(step + 1);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const nextStep3 = () => {
        if (otp !== "") {
            let data = {
                User_email: User_email,
                User_id: Userprofile.User_id,
                password: Userprofile.password,
                firstname: Userprofile.firstName,
                lastname: Userprofile.lastName,
                majors: Userprofile.majors,
                otp: otp

            }
            axios.post(Api('studentregistre'), data)

                .then(res => {
                    if (res.data.messages === 'Register Success') {
                        Swal.fire(
                            'สมัครสมาชิกเรียบร้อย',
                            '',
                            'success'
                        )
                        setUserProfile(setuser)
                        setotp("")
                        setstep(1)
                    }
                    else if (res.data.messages === 'Register Fail') {
                        Swal.fire(
                            'รหัส otp ไม่ถูกต้อง',
                            '',
                            'error'
                        )
                    }
                    else if (res.data.messages === 'FAIL OVERTIME') {
                        Swal.fire(
                            'เกินเวลา otp',
                            '',
                            'error'
                        )
                    }
                })

                .catch((error) => {
                    console.log(error);

                });
        }
        else {
            Swal.fire(
                'กรุณากรอกรหัส OTP',
                '',
                'warning'
            )
        }
    }

    const prevStep = () => {
        setstep(1);
        setUserProfile(setuser)
        setotp("")
        setstep(1)
    }
    const showStep = () => {

        if (step === 1)
            return (<PersonalInfo
                handleInputChange={handleInputChange}
                majors={major}
                password={Userprofile.password}
                onchangscore={e => setscore(e)}
                nextStep={nextStep}
            />);


        if (step === 2)
            return (<AllInfo
                userprofile={Userprofile}
                User_email={User_email}
                prevStep={prevStep}
                nextStep2={nextStep2}
            />);


        if (step === 3)
            return (<JobDetails
                nextStep3={nextStep3}
                prevStep={prevStep}
                onChangeotp={e => setotp(e)}
                User_email={User_email}
            />);
    }


    return (
        <>

            <Container className="text-white mt-5">
                <Card className="cardEmp" >
                    <CardImg width="20%" src={Bg} alt="Card image cap" />
                    <CardImgOverlay>
                        <CardHeader className="mb-5 card-header text-center bgtext2 p-4" tag="h4">สมัครฟรีแลนซ์</CardHeader>
                        <Form color="dark" className="mb-5 m-3 p-3 bgtext">
                            {showStep()}
                        </Form>

                        <Progress animated color="dark" className="mt-5" value={step} max="3" >{step} of 3</Progress>
                    </CardImgOverlay>
                </Card>
            </Container>
        </>
    );
}

export default StepForm1;