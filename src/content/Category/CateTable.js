import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle, Col, Row } from 'reactstrap';
import Api from '../../api/Api';



const CateTable = () => {
    // showtable..............
    const [category, setCategory] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(Api('MainCate'))

            .then((response) => {
                if (isMounted) setCategory(response.data);
            });
        return () => { isMounted = false };

    }, []);

    return (
        <>
            <Container className="mt-3 mb-3">

                <Row >
                    {category.map((cate) => (
                        <Col sm={4} className="mb-3" key={cate.main_cate_id}>
                            <a href={"/subbymain/" + cate.main_cate_id} >
                                <Card inverse id="size-card">
                                    <CardImg id="size-img" src={cate.main_cate_img} alt="Card image cap" />
                                    <CardImgOverlay className="bg">
                                        <center>
                                            <CardTitle tag="h4" id="posi">{cate.main_cate_name}</CardTitle>
                                        </center>
                                    </CardImgOverlay>
                                </Card></a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default CateTable
