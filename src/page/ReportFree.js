import React from 'react'
import Report from "../content/report/ReportFree";

const ReportFree = () => {
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

export default ReportFree
