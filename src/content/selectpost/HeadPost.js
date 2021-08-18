import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Jumbotron
} from 'reactstrap';
import Api from '../../api/Api';
import '../../css/cardhome.css';
import SelecPackage from "./Selecpackage";

const HeadPost = ({ id }) => {


    const [showdetail, setShowdetail] = useState([]);
    useEffect(() => {
        axios.get(Api('detailpost') + id)
            .then((response) => {
                setShowdetail(response.data[0])
                console.log(response.data)
            })

    }, [id]);

    const [showpackage, setPackage] = useState([]);
    useEffect(() => {
        let isMounted = true;

        axios.get(Api('getPackage') + id)
            .then((response) => {
                if (isMounted) setPackage(response.data)
            })
        return () => { isMounted = false };

    }, [id]);

   


    return (

        <>


            <Jumbotron className="head-work" key={showdetail.aw_std_id}>
                <h1 style={{ color: "#ff5722" }}>{showdetail.aw_name}</h1>

                <p className="selac-detail">{showdetail.aw_detail}</p>
                <hr />
            </Jumbotron>

           <SelecPackage showpackage={showpackage} />

        </>
    )

}

export default HeadPost
