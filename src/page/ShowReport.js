import React from 'react'
import Report from '../content/report/ReportAdmin'

const ShowReport = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Report />
        </>
    )}
}

export default ShowReport
