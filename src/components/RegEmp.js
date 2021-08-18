import React from 'react'
import { Card, CardImg, CardImgOverlay, Badge, CardHeader } from 'reactstrap';
import BgFl from '../img/emp.jpg'
const RegEmp = () => {
    return (
        <>
            <Badge href={"/emp"} color="none" className="text-white " >
                <Card >
                <CardImg width="20%" src={BgFl} alt="Card image cap"/>
                    <CardImgOverlay className="bgtext2">
                        <CardHeader name="regis-empoly" tag="h2">สมัครผู้ว่าจ้าง</CardHeader>
                    </CardImgOverlay>
                </Card>
            </Badge>

        </>

    )
}

export default RegEmp
