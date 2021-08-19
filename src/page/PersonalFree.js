import React from 'react'
import Profile from '../content/Profile/Personal';
import { Helmet } from 'react-helmet'
const TITLE = 'Flashwork - ข้อมูลส่วนตัว'
const PersonalFree = () => {
    const Std_id = localStorage.getItem('User_id');

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
           <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
            <Profile id={Std_id} />
        </>
    )}
}

export default PersonalFree
