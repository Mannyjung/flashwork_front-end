import React, { useEffect, useState } from 'react'
import {
   CardTitle, Container

} from 'reactstrap';
import axios from 'axios';
import '../css/cardhome.css';
import Formcard from '../content/Formcard';
import api from '../api/Api';
import Slider from "react-slick";


const Maincate = ({ id }) => {
  const [subcatework, setSubcatework] = useState([]);
  const [maincateid, setMaincateid] = useState([]);
  const [workbycate, setWorkbycate] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get(api('showWorkbyMaincate') + id, {
    })
      .then((res) => {
        if (isMounted) setWorkbycate(res.data);
      })
    return () => { isMounted = false };
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    axios.get(api('MainCate') + "/" + id, {
    })
      .then((res) => {
        if (isMounted) setMaincateid(res.data);
      })
    return () => { isMounted = false };
  })

  useEffect(() => {
    let isMounted = true;

    axios.get(api('subcatebyid') + id, {
    })
      .then((res) => {
        if (isMounted) setSubcatework(res.data);
      })
    return () => { isMounted = false };
  }, [id]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>

      <Container style={{ marginTop: "5%" }}>

        <CardTitle tag="h1">{maincateid.main_cate_name}</CardTitle>
        <Slider {...settings}>
          {subcatework.map((subcate) => {
            return (

              <>
            
               <a href={"/subcate/" + subcate.sub_cate_id } style={{textDecoration:"none"}} > <h3> {subcate.sub_cate_name}</h3></a>

              </>
            )
          })}
        </Slider>



        <style>{cssstyle}</style>
        {/* หมวดหมู่ย่อย */}


        {/* งานโชว์ */}
        
        <br /> <br /><p></p><p></p>
        <CardTitle tag="h1">งาน</CardTitle>
        
        <Formcard showcardwork={workbycate} />


      </Container>


    </>
  )
}
const cssstyle = `

h3 {
  
  background: #ff9955;
    color: black;
    font-size: 18px;
    line-height: 80px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
   
}
h3:hover{
  transform: scale(1.05);
    transition-duration: 0.5s;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
`
export default Maincate