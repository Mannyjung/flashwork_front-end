import React from 'react';
import HisFree from '../content/history/HisFree';
const HisworkFree = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <HisFree />
        </>
    )}
}

export default HisworkFree
