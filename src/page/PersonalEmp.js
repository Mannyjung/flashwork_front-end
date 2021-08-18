import React from 'react'
import Profile from '../content/Profile/PersonalEmp';
const PersonalFree = () => {
    const username = localStorage.getItem('User_id');

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Profile username={username} />
        </>
    )}
}

export default PersonalFree
