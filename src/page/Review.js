import React from 'react'
import '../css/link.css';
import '../css/regfree.css';
import '../css/comment.css';
import { Container, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, CardHeader } from 'reactstrap';
import { Card } from '@material-ui/core';


const Review = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Container className="mt-5" >
                <h2 className="titleFree" style={{ marginTop: "5%", marginLeft: "44%" }}>การจ้างงาน</h2>
                <Card>
                    <CardHeader  >
                        <img src="https://source.unsplash.com/collection/1165483" className="border rounded-circle  mb-0" width="60" height="60" alt="Cardcap"> </img> <b>payut junosha</b>

                    </CardHeader>
                    <CardImg top width="500px" height="500px" src="https://source.unsplash.com/collection/1165483" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h4"  ><b> รับออกแบบโลโก้ ทุกสไตล์ ด้วยมืออาชีพ </b></CardTitle>
                        <CardTitle tag="h5" className="mb-2 text-muted">ออกแบบโลโก้ร้านค้า จำนวน 2แบบ ราคา 1600.- บาท</CardTitle><br></br>
                        <CardSubtitle>
                            #แก้แบบได้3ครั้ง ลูกค้าแก้4ครั้งคิดค่าปรับแก้เกินโคต้าเป็นจำนวนเงินรอบละ 800.- บาท<br></br>
                           #ระยะเวลาในการทำงาน: 3 วัน
                        </CardSubtitle>
                        <br></br>
                        <CardText tag="h4" style={{ color: 'red' }} >รวมราคา 3400.- บาท </CardText>

                        <Button style={{ marginTop: "5%", marginLeft: "35%" }} color="danger">จ้างอีกครั้ง</Button>{' '}
                        <Button style={{ marginTop: "5%", marginLeft: "2%" }} color="primary" href="/Comment">ให้คะแนน</Button>
                    </CardBody>
                </Card>

            </Container>






        </>
    )}
}

export default Review
