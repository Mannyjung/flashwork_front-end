import React from 'react'
import { Container } from 'reactstrap';
import Chkstatus from '../content/Upstatus';
const Upstatus = (props) => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Container fluid>
                <Chkstatus id={props.match.params.id} />
            </Container>
        </>
    )}
}

export default Upstatus
