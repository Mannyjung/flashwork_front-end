import React from 'react'
import ShowPackages from '../content/post/Showpackage'
const ShowPackage = (props) => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <ShowPackages id={props.match.params.id} />
        </>
    )}
}

export default ShowPackage
