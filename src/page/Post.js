import React from 'react'
import Posttitle from '../content/post/Posttitle';

const Post = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Posttitle />
        </>

    );}
};

export default Post
