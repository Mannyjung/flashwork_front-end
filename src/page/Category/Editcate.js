import React from 'react'
import { Container } from 'reactstrap'
import Editcatefrom from '../../content/Category/Editcatefrom'
import '../../css/category.css';
const Editcate = (props) => {
    return (
        <> 
        <Container className="mt-5">
            <Editcatefrom id={props.match.params.id}/>
            </Container>
        </>
    )
}

export default Editcate
