import { useEffect, useState } from 'react'
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhoneIcon from '@material-ui/icons/Phone';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DescriptionIcon from '@material-ui/icons/Description';
import axios from 'axios';
import Api from '../../api/Api';
import { Card } from '@material-ui/core';
import { CardBody, CardHeader, Col } from 'reactstrap';
import '../../css/cardhome.css';


const ParsonalFreeland = ({ id }) => {
    const [showdetail, setShowdetail] = useState([]);
    useEffect(() => {
        axios.get(Api('freepost') + id)
            .then((response) => {
                setShowdetail(response.data)
            })
    }, [id]);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {showdetail.map((detail) => {
                return (


                    <Box sx={{ width: '100%', typography: 'body1' }} color="default" className="freeland-pac">
                        <TabContext value={value} id="freeland-pac" >
                            {/* <Jumbotron fluid className="bgc  ml-3 mr-3" > */}
                                <Col sm={10} >
                                    <h1>เจ้าของงาน</h1>
                                    <CardHeader  >
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab icon={<PersonPinIcon />} label="ข้อมูลส่วนตัว" value="1" />
                                                <Tab icon={<PhoneIcon />} label="ข้อมูลติดต่อ" value="2" />
                                            </TabList>
                                        </Box>
                                    </CardHeader>
                                </Col>


                                <TabPanel value="1">
                                    <Col sm={4} >

                                        <Card style={{ borderRadius: "40px" }} className="mt-3">
                                            <CardBody style={{ borderRadius: "40px" }}>
                                                <img src={detail.std_image} className="border rounded-circle  mb-0" width="80" height="80" alt=""   >
                                                </img>
                                                <ArrowRightIcon></ArrowRightIcon>
                                                <a  style={{ color: "#F94B26" }}  href={"/Useraccount/" + detail.aw_std_id}  > {detail.std_fname}{" "}{detail.std_lname}</a>
                                                <br></br>
                                                <DescriptionIcon></DescriptionIcon> <b style={{ color: "#F9C226" }} >คำอธิบาย</b> {detail.std_description} 
                                               
                                                <hr></hr>

                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPanel>
                                <TabPanel value="2">
                                <Col sm={4} >

                                        <Card style={{ borderRadius: "40px" }} className="mt-3">
                                            <CardBody style={{ borderRadius: "40px" }}>
                                                <img src={detail.std_image} className="border rounded-circle  mb-0" width="80" height="80" alt=""   >
                                                </img>
                                                <ArrowRightIcon></ArrowRightIcon>
                                                <a style={{ color: "#F94B26" }} href={"/Useraccount/" + detail.aw_std_id} > {detail.std_fname}{" "}{detail.std_lname}</a>
                                                <br></br>
                                                <EmailIcon></EmailIcon> <b style={{ color: "#F9C226" }} >Email</b> {detail.std_email}
                                                <br></br>
                                                <PhoneInTalkIcon ></PhoneInTalkIcon > <b style={{ color: "#F9C226" }} >Phone</b> {detail.std_phone} 
                                                <hr></hr>

                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPanel>
                            {/* </Jumbotron> */}
                        </TabContext>
                    </Box>







                )
            })}
        </>
    )
}

export default ParsonalFreeland






