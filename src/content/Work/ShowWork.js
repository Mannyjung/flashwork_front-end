import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap'
import Api from '../../api/Api'

const ShowWork = () => {
    const [showwork, setshowwork] = useState([])
    useEffect(() => {
        let isMounted = true;

        axios.get(Api('show_work'), {
        })
            .then((res) => {
                setshowwork(res.data);
            });
            return () => { isMounted = false };
    }, []);

    return (
        <CardDeck style={{ marginLeft: "1%" }}>

            {showwork.map((showwork) => {
                return (
                    <Card key={showwork.aw_id} value={showwork.aw_id}>
                        <CardImg top width="200px" height="200px" src={process.env.PUBLIC_URL + '/a/' + showwork.w_img_name} alt={showwork.w_img_name} />
                        <CardBody>
                            <CardTitle tag="h5">{showwork.aw_name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{showwork.aw_detail}</CardSubtitle>
                            <CardText>Detail</CardText>
                            <Button color="primary">Button</Button>
                        </CardBody>
                    </Card>
                )
            })}
        </CardDeck >
    )
}
export default ShowWork