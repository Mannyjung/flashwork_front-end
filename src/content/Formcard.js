import React from 'react'
import {
    Card, Row, Col, CardImg, CardBody, CardText

} from 'reactstrap';


import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const Formcard = ({ showcardwork }) => {


    return (
        <>
            <Row>
                {showcardwork.map((onework) => {
                    return (
                        <>
                            <Col sm="4">
                                <a className="linkwork" href={"/SelectPost/" + onework.aw_id} >
                                    <Card className="cardw">

                                        <CardHeader
                                            avatar={
                                                <Avatar alt="Travis Howard"
                                                    src={onework.std_image} />
                                            }

                                            title={onework.std_fname}
                                            subheader={onework.aw_std_id}

                                        />
                                        <CardImg className="imgwork" src={onework.w_img_name} alt="Card image cap" />

                                        <CardBody className="body-name">
                                            <Row >
                                                <Col sm="12" className="cwc11">
                                                    <b><CardText>{onework.aw_name}</CardText></b>
                                                    <CardText > <b style={{ color: "orange" }}> ราคา  </b>
                                                        <b>{onework.pk_price} {onework.pk_time_period}</b>
                                                    </CardText>
                                                </Col>

                                            </Row>

                                        </CardBody>
                                     
                                    </Card>
                                </a>
                                <br /><p></p>
                            </Col>
                        </>
                    )
                })}
            </Row>
        </>
    )
}

export default Formcard