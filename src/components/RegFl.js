import React from 'react'
import { Card, CardImg, CardImgOverlay, Badge, CardHeader } from 'reactstrap';
import BgFl from '../img/free.jpg'
const RegFl = () => {
    return (
        <div>
            <Badge href={"/fl"} color="none" className="text-white ">
                <Card >

                    <CardImg width="20%" src={BgFl} alt="Card image cap" />
                    <CardImgOverlay className="bgtext2">
                        <CardHeader tag="h2">สมัครฟรีแลนซ์</CardHeader>



                    </CardImgOverlay>
                </Card>
            </Badge>
        </div>
    )
}

export default RegFl
