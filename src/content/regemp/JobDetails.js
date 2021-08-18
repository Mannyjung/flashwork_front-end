import React, { useState, useEffect } from 'react';
import { Col, Row, ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import Api from '../../api/Api';
const JobDetails = ({ nextStep3, prevStep, onChangeotp, email }) => {
    const [counter, setCounter] = useState(300);
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const sendagain = () => {
        let $data = {
            'email': email,
            'Status_reset': true,
        }
        axios.put(Api('VerifyregisteS')+ email, $data)
            .then(res => {
            })
        setCounter(180)
    }

    if (counter <= 0) {
        let $data = {
            'email': email,
            'Status_reset': false,
        }
        axios.put(Api('VerifyregisteS')+ email, $data)
            .then(res => {
            })
        return (
            <>
                <div>กรุณากรอก OTP ภายในระยะเวลา: {counter} sec</div>
                {/*  */}
                <h3 className="mb-3">การยืนยันตัวตน</h3>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleName">อีเมล</Label>
                            <Input type="email" name="email" id="email" value={email} placeholder="ชื่อผู้ใช้" disabled />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">รหัส OTP </Label>
                            <Input type="password" name="chkotp" id="chkotp" placeholder="รหัส OTP" onChange={e => onChangeotp(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <ButtonGroup className="mt-3">
                    <Button outline className="bgButton2" onClick={prevStep}>ย้อนกลับ</Button>
                    <Button className="bgButton" onClick={nextStep3}>ยืนยันข้อมูล</Button>
                </ButtonGroup>
                <Row>
                    <Col md={6}>
                        <Button outline className="bgButton2" onClick={sendagain}>ส่งรหัสอีกครั้ง</Button>
                    </Col>
                </Row>
            </>
        );
    }
    else {
        return (
            <>
                <div>Countdown: {counter}</div>
                {/*  */}
                <h3 className="mb-3">การยืนยันตัวตน</h3>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleName">อีเมล</Label>
                            <Input type="email" name="email" id="email" value={email} placeholder="ชื่อผู้ใช้" disabled />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">รหัส OTP </Label>
                            <Input type="password" name="chkotp" id="chkotp" placeholder="รหัส OTP" onChange={e => onChangeotp(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <ButtonGroup className="mt-3">
                    <Button outline className="bgButton2" onClick={prevStep}>ย้อนกลับ</Button>
                    <Button className="bgButton" onClick={nextStep3}>ยืนยันข้อมูล</Button>
                </ButtonGroup>
            </>

        );
    }

}


export default JobDetails;