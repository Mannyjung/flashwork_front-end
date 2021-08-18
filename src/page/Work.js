import React from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

import '../css/work.css';
import Content from '../content/Work/Work';
import Pic from '../content/Work/Card';
const Work = () => {

    return (

        <>

            <Container fluid >
                <Row>
                    <Col md={9} >
                        <Container fluid={true}  >
                            <Content />
                        </Container>
                    </Col>
                    <Col md={3} >
                        <Container fluid={true}  >
                            <Pic />
                        </Container>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Work
