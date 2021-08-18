import React from 'react';
import Photos from '../content/post/PhotoList';
const PhotosMypost = (props) => {

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <div>
            <Photos id={props.match.params.id} />
        </div>
    )}
}

export default PhotosMypost
