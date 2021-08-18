import React, { useEffect, useState } from 'react';
import {
  Card, CardTitle, Container, CardImg, CardImgOverlay, Button

} from 'reactstrap';
import axios from 'axios';
import ReactTypingEffect from 'react-typing-effect';
import '../css/cardhome.css';
import api from '../api/Api';
import Slider from "react-slick";
import Nextpage from "../page/Nextpage";

const Cardhome = () => {
  const [showcardlogo, setShowcardlogo] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(api('MainCate'), {
    })
      .then((res) => {
        if (isMounted) setShowcardlogo(res.data);
      });
    return () => { isMounted = false };
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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

      <Container style={{ marginTop: "5%" }} className="home">

        <div style={{ textAlign: "center" }}>
          <h3 id="ddd">เรามีฟรีแลนซ์มืออาชีพด้าน...</h3>
          <div >
            <ReactTypingEffect text={['Graphic & Design', 'การตลาดและโฆษณา', 'เขียนและแปลภาษา', 'ภาพและเสียง', 'Web & Programming', 'จัดการร้านค้าออนไลน์']} speed="50" eraseSpeed="50" className="typingeffect"></ReactTypingEffect>
          </div>
          <h2 style={{ marginTop: "1%" }}>ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นความจริง</h2>
        </div>

        <p></p>
        <CardTitle tag="h1">หมวดหมู่งาน</CardTitle>
        <style>{cssstyle}</style>
        <Slider {...settings}>
          {showcardlogo.map((onecard) => {
            return (
              <>

                <Card className="cardlogo">
                  <CardImg className="imgnew" src={onecard.main_cate_img} alt={onecard.main_cate_img} />


                  <CardImgOverlay className="cardlink">

                    <Button href={"/maincate/" + onecard.main_cate_id} className="button1" color="none">{onecard.main_cate_name}</Button>

                  </CardImgOverlay>

                </Card > {" "}


                <br /> <br />
              </>
            )
          })}
        </Slider>


        {/* หมวดหมู่หลัก */}

        {/* งานที่โชว์ */}

        <br /> <br />
        <CardTitle tag="h1">งาน</CardTitle>
        {/* <Formcard showcardwork={showcardwork} /> */}
        <Nextpage />

      </Container>

      <br /> <br /><p></p>
    </>

  );
};
const cssstyle = `

.slick-next:before, .slick-prev:before {
    color: #000;
}
`
export default Cardhome;