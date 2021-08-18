import React from 'react'
import Epy from '../content/Employment/EmploymentEpy';
const EmploymentEpy = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Epy />
        </>
    )}
}

export default EmploymentEpy
