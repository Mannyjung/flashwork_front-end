import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container , Row } from 'reactstrap'
import useBG from '../../img/empf.png';
import axios from 'axios';
import Api from '../../api/Api';
import '../../css/cardhome.css';

const Review = ({ id }) => {
  const [showdetail, setShowdetail] = useState([]);
  useEffect(() => {
    let isMounted = true;

    axios.get(Api('reviewpost') + id)
      .then((response) => {
        if (isMounted) setShowdetail(response.data)
      })
    return () => { isMounted = false };

  }, [id]);
  return (
    <>
      <br />
      {/* <Jumbotron fluid className="bgc mt-3 ml-3"  */}
        <Container fluid className="review-work">
          <h1 className="display-6">รีวิว</h1>
          <Row>
            {
              showdetail.map((detail) => {
                return (
                  <Col sm={12} key={detail.emm_user_id} >

                    <Col sm={6}>

                      <Card style={{ borderRadius: "40px" }}>

                        <CardHeader style={{ borderRadius: "40px" }}>
                          <img src={useBG} className="border rounded-circle  mb-0" width="60" height="60" alt=""   >
                          </img>
                          <b className="mt-3  ml-3"> {detail.emm_user_id}</b>
                        </CardHeader>
                        <CardBody style={{ borderRadius: "40px" }}>
                          <h3>: {detail.emm_review} </h3>
                        </CardBody>
                      </Card>
                      <hr />
                    </Col>


                  </Col>
                )
              })
            }
          </Row>
        </Container>
      {/* </Jumbotron> */}
      <br />
    </>
  )
}

export default Review
