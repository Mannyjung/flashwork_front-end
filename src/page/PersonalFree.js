import React from 'react'
import Profile from '../content/Profile/Personal';
const PersonalFree = () => {
    const Std_id = localStorage.getItem('User_id');

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Profile id={Std_id} />
        </>
    )}
}

export default PersonalFree
