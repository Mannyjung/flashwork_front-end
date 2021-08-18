import React from 'react'
import Profile from '../content/manageuser/ProfileEmpforadmin';

const ProfileEmpforadmin = (props) => {

    if (localStorage.getItem('status') !== 'Admin') {


        window.location.assign("/login2")


    }
    else {
        return (
            <>
                <Profile id={props.match.params.id} />
            </>
        )
    }


}

export default ProfileEmpforadmin
