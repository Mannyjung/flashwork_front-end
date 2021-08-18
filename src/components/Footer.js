import React from "react";
import "../css/footer.css";

import { Row, Col, Container } from 'reactstrap';

const Footer = () => (
  <>
    <Container fluid className="bg-footer mar">

      <hr className="line-size" />

      <Row className="ml-5 text-white">
        <Col sm={3} >
          <h5>ติดต่อได้</h5>
          <Container className="mt-3 mb-5" >
            <h6 >Line</h6>
            <h6>Facebook</h6>
            <h6>instagram</h6>
          </Container>

        </Col>
        <Col sm={3} >
          <h5>เบอร์</h5>
          <Container className="mt-3 mb-5" >
            <h6 >0993896785</h6>
            <h6>0878056627</h6>

          </Container>

        </Col>
        <Col sm={3} >
          <h5>ที่อยู่</h5>
          <Container className="mt-3 mb-5" >
            <h6 >85 ถ. มาลัยแมน ตำบล วังตะกู อำเภอเมืองนครปฐม นครปฐม 73000</h6>

          </Container>

        </Col>
        <Col sm={3} >
          <h5>อีเมล์</h5>
          <Container className="mt-3 mb-5" >
            <h6 >614259048@webmail.npru.ac.th</h6>

          </Container>

        </Col>


      </Row>
      <div style={{ backgroundColor: '#fb5510' }} >
        <label className=" m-3 text-white" >© Copyright  FlashWork  Company limited, 2021. All rights reserved.</label>
      </div>
    </Container>



  </>
);

export default Footer;

