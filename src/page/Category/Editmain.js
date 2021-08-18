import React from 'react'
import { Container } from 'reactstrap'
import EditMain from '../../content/Category/EditMain'

const Editmain = (props) => {
    return (
        <>
            <Container className="mt-5">
            <EditMain id={props.match.params.id}/>
            </Container>
        </>
    )
}

export default Editmain
