import React from 'react'
import Profile from '../content/Profile/PersonalEmp';
import { Helmet } from 'react-helmet'
const TITLE = 'Flashwork - ข้อมูลส่วนตัว'
const PersonalFree = () => {
    const username = localStorage.getItem('User_id');

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
        <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
            <Profile username={username} />
        </>
    )}
}

export default PersonalFree
