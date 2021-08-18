import React, { useEffect, useState } from 'react'
import {
  CardTitle, Container,

} from 'reactstrap';
import axios from 'axios';
import '../css/cardhome.css';
import Formcard from './Formcard';
import Api from '../api/Api';



const Subcate = ({ id }) => {

  const [subcateid, setSubcateid] = useState([]);
  const [workbycate, setWorkbycate] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get(Api('subcate') + id, {
    })
      .then((res) => {
        if (isMounted) setSubcateid(res.data);
      })
    return () => { isMounted = false };
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    axios.get(Api('showWorkbySubcate') + id, {
    })
      .then((res) => {
        if (isMounted) setWorkbycate(res.data);
      })
    return () => { isMounted = false };
  }, [id]);





  return (
    <>

      <Container style={{ marginTop: "2%" }}>

        <CardTitle tag="h1">{subcateid.sub_cate_name}</CardTitle>
        <Formcard showcardwork={workbycate} />

      </Container>


    </>
  )
}

export default Subcate
