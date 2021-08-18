import React from 'react'
import HisEmp from '../content/history/HisEmp';
const HisworkEmp = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <HisEmp />
        </>
    )}
}

export default HisworkEmp
