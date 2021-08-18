import React from 'react'
import { Container } from 'reactstrap'
import Comments from'../content/Work/comment';
const Comment = (props) => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <> 
        <Container className="mt-5">
            <Comments id={props.match.params.id}/>
            </Container>
        </>
    )}
}

export default Comment
