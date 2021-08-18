import React from 'react'
import Employment from '../content/Employment/EmploymentFl'

const EmploymentFl = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Employment />
        </>
    )}
}

export default EmploymentFl
