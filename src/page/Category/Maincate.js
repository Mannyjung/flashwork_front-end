import React from 'react'
import Maincategory from  '../../content/Maincate'

const Maincate = (props) => {
    return (
        <div>
            <Maincategory id={props.match.params.id} />
            
        </div>
    )
}

export default Maincate
