import React from 'react'
import RegFl from '../components/RegFl';
import RegEmp from '../components/RegEmp';
import '../css/link.css';
import '../css/regfree.css';
import { CardGroup, Container, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Home = () => {
    
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/register">
                        <Container className="mt-5">
                       
                            <CardGroup id="bgtext" >
                                <Col className="box-regis" > <RegEmp /></Col>
                                <Col sm="0" className="mx-auto" > หรือ </Col>
                                <Col className="box-regis">  <RegFl /></Col>
                            </CardGroup>
                   
                        </Container>
                    </Route>
                

                  
                </Switch>
            </Router>
        </>
    )
}

export default Home
