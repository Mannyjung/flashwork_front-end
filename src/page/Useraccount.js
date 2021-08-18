import React from 'react'
import Useraccountme from '../content/Useraccount'

const Useraccount = (props) => {
    return (
        <>
            <Useraccountme id={props.match.params.id} />
        </>
    )
}

export default Useraccount
