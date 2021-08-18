import React from 'react'
import Profile from '../content/manageuser/ProfileFreeforadmin';

const ProfileFreeforadmin = (props) => {

    if (localStorage.getItem('status') !== 'Admin') {

        window.location.assign("/")
    }
    else {
        return (
            <>
                <Profile id={props.match.params.id} />
            </>
        )
    }

}

export default ProfileFreeforadmin
