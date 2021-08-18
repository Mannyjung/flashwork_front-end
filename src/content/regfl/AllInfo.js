import React from 'react';
import { CardHeader, List, Button, ButtonGroup } from 'reactstrap';
const AllInfo = ({ prevStep, nextStep2, userprofile, User_email }) => {
    return (
        <>
            <CardHeader tag="h3"> ยืนยันการสมัคร</CardHeader>
            <List type="unstyled" className="m-2">
                <li>ชื่อ : {userprofile.firstName}</li>
                <li>นามสกุล : {userprofile.lastName}</li>
                <li>อีเมล : {User_email}</li>
                <li>ชื่อผู้ใช้ : {userprofile.User_id}</li>
            </List>

            <ButtonGroup className="mt-3">
                <Button outline className="bgButton2" onClick={prevStep}>ย้อนกลับ</Button>
                <Button className="bgButton" onClick={nextStep2}>ยืนยันข้อมูล</Button>
            </ButtonGroup>
        </>
    );
}

export default AllInfo;