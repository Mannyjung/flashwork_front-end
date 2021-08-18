import React from 'react';
import Myposts from '../content/post/Mypost';
const Mypost = () => {

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
        <Myposts />
        </>
    )}
}

export default Mypost
