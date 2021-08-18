import React from 'react';
import { Col, Row, ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap';
import PasswordStrengthBar from 'react-password-strength-bar';
const PersonalInfo = ({ handleInputChange, password, nextStep, onchangscore, majors }) => {

    return (
        <>

            <Row >
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">รหัสนักศึกษา</Label>
                        <Input type="text" name="User_id" placeholder="รหัสนักศึกษา" onChange={handleInputChange} maxLength="9" />
                        <span className="err" name="err" id="User_id"></span>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <Label for="examplePassword">เลือกสาขาที่ศึกษาอยู่</Label>

                    
                    <Input type="select" name="majors" id="exampleSelect" onChange={handleInputChange}>
                        <option value='0'>เลือกสาขาที่ศึกษาอยู่</option>
                        {majors.map((majors) => {
                            return (
                                <option key={majors.major_id} value={majors.major_id}>{majors.major_name} </option>
                            )
                        })
                        }
                    </Input>

                    <span className="err" name="err" id="majors"></span>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleName">ชื่อ</Label>
                        <Input type="text" name="firstName" placeholder="ชื่อ" onChange={handleInputChange} />
                        <span className="err" name="err" id="firstName"></span>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleName">นามสกุล</Label>
                        <Input type="text" name="lastName" placeholder="นานสกุล" onChange={handleInputChange} />
                        <span className="err" name="err" id="lastName"></span>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="examplePassword">รหัสผ่าน</Label>
                        <Input type="password" name="password" placeholder="รหัสผ่าน" onChange={handleInputChange} />
                        <span className="err" name="err" id="password"></span>
                    </FormGroup>
                    <PasswordStrengthBar password={password} onChangeScore={onchangscore} />
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="examplePassword">ยืนยันรหัสผ่าน</Label>
                        <Input type="password" name="conPassword" placeholder="ยืนยันรหัสผ่าน" onChange={handleInputChange} />
                        <span className="err" name="err" id="conPassword"></span>
                    </FormGroup>
                </Col>

            </Row>
            <ButtonGroup className="mt-3">
                <Button outline className="bgButton2" href={"/register"}>ย้อนกลับ</Button>

                <Button className="bgButton" onClick={nextStep} >ยืนยันข้อมูล</Button>
            </ButtonGroup>

            {/*  */}

        </>
    );
}

export default PersonalInfo;