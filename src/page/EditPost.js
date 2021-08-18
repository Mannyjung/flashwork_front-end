import React from 'react';
import Editposts from '../content/post/Editpost';
const EditPost = (props) => {

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Editposts id={props.match.params.id} />
        </>
    )}
}

export default EditPost
